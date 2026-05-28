# Technical Specifications: Agency Management Module

## 1. Database Schema

### 1.1. Agency Table

```sql
-- Bảng chính lưu thông tin công ty quản lý
CREATE TABLE agencies (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE,
  business_license VARCHAR(50),
  tax_id VARCHAR(20),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  logo_url TEXT,
  description TEXT,
  website VARCHAR(200),
  subscription_tier VARCHAR(20), -- 'starter', 'professional', 'enterprise'
  subscription_expires_at TIMESTAMP,
  status VARCHAR(20), -- 'pending', 'active', 'suspended', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agencies_slug ON agencies(slug);
CREATE INDEX idx_agencies_status ON agencies(status);
CREATE INDEX idx_agencies_tier ON agencies(subscription_tier);
```

### 1.2. Agency Members Table

```sql
-- Bảng lưu nhân viên của agency (có quyền truy cập dashboard)
CREATE TABLE agency_members (
  id UUID PRIMARY KEY,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20), -- 'owner', 'admin', 'coordinator', 'viewer'
  permissions JSONB, -- Custom permissions
  invited_by UUID REFERENCES users(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agency_id, user_id)
);

CREATE INDEX idx_agency_members_agency ON agency_members(agency_id);
CREATE INDEX idx_agency_members_user ON agency_members(user_id);
```

### 1.3. Agency Talents Table

```sql
-- Bảng lưu danh sách KOL/Model thuộc agency
CREATE TABLE agency_talents (
  id UUID PRIMARY KEY,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for ghost profiles
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  status VARCHAR(20), -- 'active', 'inactive', 'on_leave'
  contract_start_date DATE,
  contract_end_date DATE,
  commission_rate DECIMAL(5,2), -- Agency's cut (e.g., 30.00)
  added_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(agency_id, user_id)
);

CREATE INDEX idx_agency_talents_agency ON agency_talents(agency_id);
CREATE INDEX idx_agency_talents_user ON agency_talents(user_id);
CREATE INDEX idx_agency_talents_status ON agency_talents(status);
```

### 1.4. Agency Wallet Table

```sql
-- Bảng lưu ví tiền của agency
CREATE TABLE agency_wallets (
  id UUID PRIMARY KEY,
  agency_id UUID REFERENCES agencies(id) UNIQUE ON DELETE CASCADE,
  available_balance DECIMAL(15,2) DEFAULT 0,
  pending_balance DECIMAL(15,2) DEFAULT 0,
  escrow_balance DECIMAL(15,2) DEFAULT 0,
  total_earned DECIMAL(15,2) DEFAULT 0,
  total_withdrawn DECIMAL(15,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agency_wallets_agency ON agency_wallets(agency_id);
```

### 1.5. Agency Transactions Table

```sql
-- Bảng lưu lịch sử giao dịch của agency
CREATE TABLE agency_transactions (
  id UUID PRIMARY KEY,
  agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
  type VARCHAR(20), -- 'credit', 'debit', 'escrow_lock', 'escrow_release', 'withdrawal'
  amount DECIMAL(15,2),
  balance_after DECIMAL(15,2),
  description TEXT,
  reference_type VARCHAR(50), -- 'booking', 'subscription', 'refund', etc.
  reference_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agency_transactions_agency ON agency_transactions(agency_id);
CREATE INDEX idx_agency_transactions_date ON agency_transactions(created_at);
CREATE INDEX idx_agency_transactions_type ON agency_transactions(type);
```

---

## 2. API Endpoints

### 2.1. Agency Management

```
POST   /api/agencies
Body: {
  name: string,
  business_license: string,
  tax_id: string,
  email: string,
  phone: string,
  address: string,
  subscription_tier: 'starter' | 'professional' | 'enterprise'
}
Response: { agency_id, status: 'pending' }

GET    /api/agencies/:id
Response: { agency details }

PUT    /api/agencies/:id
Body: { fields to update }
Response: { updated agency }

DELETE /api/agencies/:id
Response: { success: true }
```

### 2.2. Talent Management

```
GET    /api/agencies/:id/talents
Query: ?status=active&page=1&limit=20
Response: { talents: [], total, page, limit }

POST   /api/agencies/:id/talents
Body: {
  name: string,
  email?: string,
  phone?: string,
  user_id?: uuid, // For existing users
  contract_start_date: date,
  commission_rate: number
}
Response: { talent_id }

PUT    /api/agencies/:id/talents/:talent_id
Body: { fields to update }
Response: { updated talent }

DELETE /api/agencies/:id/talents/:talent_id
Response: { success: true }

POST   /api/agencies/:id/talents/import
Body: FormData with CSV file
Response: { imported: number, failed: number, errors: [] }
```

### 2.3. Booking Management

```
GET    /api/agencies/:id/bookings
Query: ?status=upcoming&page=1&limit=20
Response: { bookings: [], total }

POST   /api/agencies/:id/bookings
Body: {
  job_id: uuid,
  talent_ids: uuid[],
  message?: string
}
Response: { booking_id }

GET    /api/agencies/:id/bookings/:booking_id
Response: { booking details }

PUT    /api/agencies/:id/bookings/:booking_id
Body: { status, notes, etc. }
Response: { updated booking }
```

### 2.4. Financial Management

```
GET    /api/agencies/:id/wallet
Response: {
  available_balance: number,
  pending_balance: number,
  escrow_balance: number,
  total_earned: number,
  total_withdrawn: number
}

GET    /api/agencies/:id/transactions
Query: ?type=credit&from=2026-01-01&to=2026-12-31&page=1
Response: { transactions: [], total }

POST   /api/agencies/:id/withdrawals
Body: {
  amount: number,
  bank_account_id: uuid
}
Response: { withdrawal_id, status: 'pending' }

GET    /api/agencies/:id/reports
Query: ?type=monthly&month=2026-05
Response: { report data }
```

---

## 3. Permission System

### 3.1. Role Definitions

```javascript
const AGENCY_ROLES = {
  owner: {
    description: 'Full access to all agency features',
    level: 100
  },
  admin: {
    description: 'Manage talents and bookings, view financials',
    level: 80
  },
  coordinator: {
    description: 'Manage bookings only',
    level: 50
  },
  viewer: {
    description: 'Read-only access',
    level: 10
  }
};

const AGENCY_PERMISSIONS = {
  owner: {
    talents: ['create', 'read', 'update', 'delete'],
    bookings: ['create', 'read', 'update', 'delete'],
    financial: ['read', 'withdraw'],
    settings: ['read', 'update'],
    members: ['create', 'read', 'update', 'delete']
  },
  admin: {
    talents: ['create', 'read', 'update'],
    bookings: ['create', 'read', 'update'],
    financial: ['read'],
    settings: ['read'],
    members: ['read']
  },
  coordinator: {
    talents: ['read', 'update'],
    bookings: ['create', 'read', 'update'],
    financial: [],
    settings: [],
    members: []
  },
  viewer: {
    talents: ['read'],
    bookings: ['read'],
    financial: [],
    settings: [],
    members: []
  }
};
```

### 3.2. Permission Check Middleware

```javascript
function checkAgencyPermission(resource, action) {
  return async (req, res, next) => {
    const { agency_id } = req.params;
    const user_id = req.user.id;
    
    // Get user's role in this agency
    const member = await db.query(
      'SELECT role FROM agency_members WHERE agency_id = $1 AND user_id = $2',
      [agency_id, user_id]
    );
    
    if (!member) {
      return res.status(403).json({ error: 'Not a member of this agency' });
    }
    
    const role = member.role;
    const permissions = AGENCY_PERMISSIONS[role];
    
    if (!permissions[resource]?.includes(action)) {
      return res.status(403).json({ 
        error: `Role '${role}' does not have permission to '${action}' on '${resource}'` 
      });
    }
    
    req.agency_role = role;
    next();
  };
}

// Usage
app.post('/api/agencies/:agency_id/talents', 
  authenticate,
  checkAgencyPermission('talents', 'create'),
  createTalent
);
```

---

## 4. Business Logic Implementation

### 4.1. Ghost Profile Creation

```javascript
async function createGhostProfile(agency_id, talent_data, created_by) {
  const transaction = await db.beginTransaction();
  
  try {
    // 1. Create user profile (without login credentials)
    const user = await db.query(`
      INSERT INTO users (name, email, phone, type, is_ghost)
      VALUES ($1, $2, $3, 'talent', true)
      RETURNING id
    `, [talent_data.name, talent_data.email, talent_data.phone]);
    
    const user_id = user.id;
    
    // 2. Link to agency
    await db.query(`
      INSERT INTO agency_talents (agency_id, user_id, name, status, added_by)
      VALUES ($1, $2, $3, 'active', $4)
    `, [agency_id, user_id, talent_data.name, created_by]);
    
    // 3. Create profile
    await db.query(`
      INSERT INTO profiles (user_id, height, weight, measurements, bio)
      VALUES ($1, $2, $3, $4, $5)
    `, [user_id, talent_data.height, talent_data.weight, 
        talent_data.measurements, talent_data.bio]);
    
    // 4. Set permissions (agency controls everything)
    await db.query(`
      INSERT INTO profile_permissions (user_id, controlled_by, can_edit_profile, can_set_pricing)
      VALUES ($1, $2, false, false)
    `, [user_id, agency_id]);
    
    await transaction.commit();
    return { user_id, success: true };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

### 4.2. Talent Joining Agency

```javascript
async function talentJoinAgency(talent_user_id, agency_id, terms) {
  const transaction = await db.beginTransaction();
  
  try {
    // 1. Check if talent is already in another agency
    const existing = await db.query(`
      SELECT agency_id FROM agency_talents 
      WHERE user_id = $1 AND status = 'active'
    `, [talent_user_id]);
    
    if (existing.length > 0) {
      throw new Error('Talent already belongs to another agency');
    }
    
    // 2. Create agency-talent relationship
    await db.query(`
      INSERT INTO agency_talents (
        agency_id, user_id, status, 
        contract_start_date, commission_rate
      )
      VALUES ($1, $2, 'active', $3, $4)
    `, [agency_id, talent_user_id, terms.start_date, terms.commission_rate]);
    
    // 3. Transfer permissions
    await db.query(`
      UPDATE profile_permissions 
      SET controlled_by = $1, can_edit_profile = false, can_set_pricing = false
      WHERE user_id = $2
    `, [agency_id, talent_user_id]);
    
    // 4. Redirect booking inbox to agency
    await db.query(`
      UPDATE user_settings 
      SET booking_inbox_redirect = $1
      WHERE user_id = $2
    `, [agency_id, talent_user_id]);
    
    // 5. Add badge to profile
    await db.query(`
      UPDATE profiles 
      SET agency_badge = $1, agency_name = (SELECT name FROM agencies WHERE id = $1)
      WHERE user_id = $2
    `, [agency_id, talent_user_id]);
    
    await transaction.commit();
    return { success: true };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

### 4.3. Agency-Talent Separation

```javascript
async function separateAgencyTalent(agency_id, talent_user_id, reason) {
  const transaction = await db.beginTransaction();
  
  try {
    // 1. Check for ongoing bookings
    const ongoing = await db.query(`
      SELECT id, value FROM bookings 
      WHERE talent_id = $1 AND status IN ('confirmed', 'in_progress')
    `, [talent_user_id]);
    
    if (ongoing.length > 0) {
      // Calculate pending payments
      const pending_amount = ongoing.reduce((sum, b) => sum + b.value, 0);
      
      // Store for settlement
      await db.query(`
        INSERT INTO separation_settlements (
          agency_id, talent_id, pending_amount, ongoing_bookings
        )
        VALUES ($1, $2, $3, $4)
      `, [agency_id, talent_user_id, pending_amount, JSON.stringify(ongoing)]);
    }
    
    // 2. Update agency-talent relationship
    await db.query(`
      UPDATE agency_talents 
      SET status = 'separated', contract_end_date = NOW(), separation_reason = $3
      WHERE agency_id = $1 AND user_id = $2
    `, [agency_id, talent_user_id, reason]);
    
    // 3. Restore talent's permissions
    await db.query(`
      UPDATE profile_permissions 
      SET controlled_by = NULL, can_edit_profile = true, can_set_pricing = true
      WHERE user_id = $1
    `, [talent_user_id]);
    
    // 4. Redirect inbox back to talent
    await db.query(`
      UPDATE user_settings 
      SET booking_inbox_redirect = NULL
      WHERE user_id = $1
    `, [talent_user_id]);
    
    // 5. Remove agency badge
    await db.query(`
      UPDATE profiles 
      SET agency_badge = NULL, agency_name = NULL
      WHERE user_id = $1
    `, [talent_user_id]);
    
    // 6. Notify both parties
    await sendNotification(agency_id, 'talent_separated', { talent_user_id });
    await sendNotification(talent_user_id, 'agency_separated', { agency_id });
    
    await transaction.commit();
    return { success: true, pending_bookings: ongoing.length };
    
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}
```

---

**Tài liệu kỹ thuật này cung cấp đầy đủ thông tin để team development triển khai module Agency Management.**
