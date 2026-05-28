# Technical Specifications: Core Features (Luồng 1)

> **Note:** This document contains technical implementation details extracted from the business documentation. For business context and Vietnamese explanations, see `/docs/for-bussinees/overview/Luồng 1_ Về luồng vận hành & Tính năng chính.md`

## 1. Technology Stack

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend Web** | React.js + TypeScript | Component-based, type-safe, large ecosystem |
| **Frontend Mobile** | React Native | Code sharing with web, faster development |
| **Backend API** | Node.js + Express | JavaScript full-stack, async I/O, scalable |
| **Database** | PostgreSQL | ACID compliance, complex queries, JSON support |
| **Cache** | Redis | Fast, in-memory, pub/sub for real-time |
| **File Storage** | AWS S3 + CloudFront CDN | Scalable, cheap, global distribution |
| **Search Engine** | Elasticsearch | Full-text search, faceted search, fast |
| **Message Queue** | RabbitMQ | Async processing, job scheduling |
| **Payment** | VNPay, Momo, Stripe | Local + international support |
| **Authentication** | JWT + OAuth 2.0 | Stateless, secure, standard |
| **Monitoring** | Sentry + DataDog | Error tracking, performance monitoring |
| **CI/CD** | GitHub Actions | Automated testing, deployment |
| **Hosting** | AWS EC2 + RDS | Flexible, scalable, reliable |

## 2. Database Schema

### 2.1. Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  type VARCHAR(20), -- 'kol', 'partner', 'agency', 'admin'
  is_verified BOOLEAN DEFAULT false,
  is_ghost BOOLEAN DEFAULT false, -- For agency-created profiles
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_type (type)
);
```

### 2.2. Profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  display_name VARCHAR(100),
  gender VARCHAR(10), -- 'male', 'female', 'other'
  date_of_birth DATE,
  city VARCHAR(50),
  district VARCHAR(50),
  bio TEXT,
  height INTEGER, -- in cm
  weight INTEGER, -- in kg
  measurements VARCHAR(20), -- e.g., "86-62-90"
  skin_tone VARCHAR(20),
  hair_color VARCHAR(20),
  has_tattoo BOOLEAN DEFAULT false,
  tattoo_description TEXT,
  languages JSONB, -- ["Vietnamese", "English"]
  skills JSONB, -- ["Catwalk", "MC", "Dance"]
  experience_years INTEGER,
  work_radius INTEGER, -- in km
  preferred_cities JSONB,
  profile_completion_score INTEGER DEFAULT 0,
  agency_id UUID REFERENCES agencies(id),
  agency_badge VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user (user_id),
  INDEX idx_city (city),
  INDEX idx_completion (profile_completion_score)
);
```

### 2.3. Photos Table

```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(20), -- 'polaroid', 'portfolio', 'work_sample', 'bts'
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  ai_tags JSONB, -- Auto-generated tags
  uploaded_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_profile (profile_id),
  INDEX idx_category (category)
);
```

### 2.4. Videos Table

```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  file_size INTEGER,
  video_type VARCHAR(20), -- 'introduction', 'skill_showcase', 'bts'
  uploaded_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_profile (profile_id)
);
```

### 2.5. Social Accounts Table

```sql
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(20), -- 'instagram', 'tiktok', 'facebook', 'youtube'
  platform_user_id VARCHAR(100),
  username VARCHAR(100),
  access_token TEXT, -- Encrypted
  refresh_token TEXT, -- Encrypted
  token_expires_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user (user_id),
  INDEX idx_platform (platform)
);
```

### 2.6. Social Metrics History Table

```sql
CREATE TABLE social_metrics_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
  followers_count INTEGER,
  following_count INTEGER,
  posts_count INTEGER,
  engagement_rate DECIMAL(5,2),
  authenticity_score DECIMAL(5,2),
  recorded_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_account_date (social_account_id, recorded_at)
);
```

### 2.7. Calendar Events Table

```sql
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20), -- 'available', 'busy', 'maybe'
  event_type VARCHAR(20), -- 'booking', 'personal', 'synced'
  external_calendar_id VARCHAR(100), -- For Google Calendar sync
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_time (user_id, start_time, end_time)
);
```

### 2.8. Jobs Table

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  job_type JSONB, -- ["Model", "PG", "MC"]
  required_count INTEGER,
  requirements JSONB, -- Structured requirements
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  location_address TEXT,
  location_lat DECIMAL(10,8),
  location_lng DECIMAL(11,8),
  compensation_amount DECIMAL(15,2),
  compensation_unit VARCHAR(20), -- 'hourly', 'daily', 'project'
  benefits TEXT,
  application_deadline TIMESTAMP,
  status VARCHAR(20), -- 'draft', 'published', 'closed', 'cancelled'
  visibility VARCHAR(20), -- 'standard', 'featured', 'urgent', 'promoted'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_partner (partner_id),
  INDEX idx_status (status),
  INDEX idx_deadline (application_deadline)
);
```

### 2.9. Applications Table

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  kol_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  proposed_rate DECIMAL(15,2),
  status VARCHAR(20), -- 'new', 'shortlisted', 'interview', 'accepted', 'rejected', 'confirmed'
  applied_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(job_id, kol_id),
  INDEX idx_job (job_id),
  INDEX idx_kol (kol_id),
  INDEX idx_status (status)
);
```

### 2.10. Bookings Table

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  partner_id UUID REFERENCES users(id),
  kol_id UUID REFERENCES users(id),
  agency_id UUID REFERENCES agencies(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  location TEXT,
  compensation_amount DECIMAL(15,2),
  platform_commission_rate DECIMAL(5,2) DEFAULT 10.00,
  platform_commission_amount DECIMAL(15,2),
  status VARCHAR(20), -- 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed'
  payment_status VARCHAR(20), -- 'pending', 'escrowed', 'released', 'refunded'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_partner (partner_id),
  INDEX idx_kol (kol_id),
  INDEX idx_status (status)
);
```

## 3. API Endpoints

### 3.1. Authentication

```
POST   /api/auth/register
Body: { email, phone, password, type }
Response: { user_id, token }

POST   /api/auth/login
Body: { email/phone, password }
Response: { user, token }

POST   /api/auth/otp/send
Body: { phone }
Response: { success: true }

POST   /api/auth/otp/verify
Body: { phone, otp }
Response: { user, token }

POST   /api/auth/social
Body: { provider, access_token }
Response: { user, token }

POST   /api/auth/logout
Response: { success: true }
```

### 3.2. Profile Management

```
GET    /api/profiles/:id
Response: { profile details }

PUT    /api/profiles/:id
Body: { fields to update }
Response: { updated profile }

POST   /api/profiles/:id/photos
Body: FormData with image file
Response: { photo_id, url }

DELETE /api/profiles/:id/photos/:photo_id
Response: { success: true }

POST   /api/profiles/:id/videos
Body: FormData with video file
Response: { video_id, url }

GET    /api/profiles/:id/completion
Response: { score, missing_fields, suggestions }
```

### 3.3. Social Media Integration

```
POST   /api/social/connect
Body: { platform, authorization_code }
Response: { social_account_id, username, followers }

POST   /api/social/:id/sync
Response: { updated_metrics }

DELETE /api/social/:id
Response: { success: true }

GET    /api/social/:id/metrics/history
Query: ?from=2026-01-01&to=2026-12-31
Response: { metrics: [] }
```

### 3.4. Search & Discovery

```
GET    /api/search/profiles
Query: ?gender=female&city=HCMC&height_min=165&followers_min=10000&page=1&limit=20
Response: { profiles: [], total, page, limit }

POST   /api/search/profiles/advanced
Body: { filters, sort, page, limit }
Response: { profiles: [], total, facets }

GET    /api/profiles/:id/similar
Response: { profiles: [] }

POST   /api/wishlists
Body: { name, profile_ids }
Response: { wishlist_id }

GET    /api/wishlists
Response: { wishlists: [] }
```

### 3.5. Job Posting

```
POST   /api/jobs
Body: { job details }
Response: { job_id }

GET    /api/jobs/:id
Response: { job details }

PUT    /api/jobs/:id
Body: { fields to update }
Response: { updated job }

DELETE /api/jobs/:id
Response: { success: true }

GET    /api/jobs/:id/applications
Query: ?status=new&page=1
Response: { applications: [], total }

PUT    /api/jobs/:id/applications/:app_id
Body: { status, notes }
Response: { updated application }
```

### 3.6. Calendar Management

```
GET    /api/calendar/events
Query: ?from=2026-06-01&to=2026-06-30
Response: { events: [] }

POST   /api/calendar/events
Body: { title, start_time, end_time, status }
Response: { event_id }

PUT    /api/calendar/events/:id
Body: { fields to update }
Response: { updated event }

DELETE /api/calendar/events/:id
Response: { success: true }

POST   /api/calendar/sync/google
Body: { authorization_code }
Response: { success: true, synced_events_count }
```

## 4. Image Processing Pipeline

```javascript
// Upload Flow
1. Client uploads image → API endpoint
2. Validate file (type, size, dimensions)
3. Generate unique filename (UUID + extension)
4. Upload original to S3 (bucket: originals/)
5. Trigger async processing job (RabbitMQ)

// Processing Job
6. Download from S3
7. Run AI checks:
   - Face detection (AWS Rekognition)
   - NSFW filter (Clarifai API)
   - Quality check (blur detection)
8. Generate variants:
   - Thumbnail: 300x400px (WebP, 80% quality)
   - Display: 1200x1600px (WebP, 85% quality)
   - Original: Keep as backup
9. Upload variants to S3 (bucket: processed/)
10. Update database with URLs
11. Invalidate CDN cache
12. Notify client via WebSocket

// Serving
- Client requests image
- CloudFront CDN serves from edge location
- If not cached, fetch from S3
- Cache for 30 days
```

## 5. Search Algorithm

```javascript
// Elasticsearch Query
{
  "query": {
    "bool": {
      "must": [
        { "match": { "gender": "female" } },
        { "range": { "height": { "gte": 165, "lte": 175 } } },
        { "term": { "city": "HCMC" } }
      ],
      "should": [
        { "range": { "followers_count": { "gte": 10000, "boost": 2.0 } } },
        { "term": { "is_verified": true, "boost": 1.5 } }
      ],
      "filter": [
        { "range": { "profile_completion_score": { "gte": 50 } } }
      ]
    }
  },
  "sort": [
    { "_score": "desc" },
    { "profile_completion_score": "desc" },
    { "updated_at": "desc" }
  ],
  "from": 0,
  "size": 20
}

// Ranking Score Calculation
score = (
  relevance_score * 0.40 +
  quality_score * 0.25 +
  popularity_score * 0.15 +
  recency_score * 0.10 +
  boost_score * 0.10
)

// Relevance Score
- Exact match on required fields: 100 points
- Partial match: 50-80 points
- Location match: +20 points
- Availability match: +30 points
- Budget match: +25 points

// Quality Score
- Profile completion: 0-100
- Verification status: +20
- Average rating: 0-100
- Completion rate: 0-100

// Popularity Score
- Profile views (last 30 days): normalized 0-100
- Saved count: normalized 0-100
- Successful bookings: normalized 0-100

// Recency Score
- Last active: exponential decay
- Profile updated: exponential decay

// Boost Score
- Paid boost: +100 points
- Featured: +50 points
```

## 6. Anti-Fraud Detection

```javascript
// Fake Follower Detection
function calculateFraudScore(socialAccount) {
  let score = 0;
  
  // Engagement Rate Check
  const engagementRate = socialAccount.engagement_rate;
  const followersCount = socialAccount.followers_count;
  
  if (followersCount > 10000 && engagementRate < 0.5) {
    score += 40; // High risk
  } else if (followersCount > 10000 && engagementRate < 1.0) {
    score += 20; // Medium risk
  }
  
  // Follower Growth Check
  const growth7d = calculateGrowthRate(socialAccount, 7);
  if (growth7d > 50) {
    score += 25; // Suspicious spike
  }
  
  // Comment Quality Check
  const commentQuality = analyzeComments(socialAccount);
  if (commentQuality < 0.3) {
    score += 20; // Generic comments
  }
  
  // Follower/Following Ratio
  const ratio = socialAccount.following_count / socialAccount.followers_count;
  if (ratio > 2) {
    score += 10; // Following too many
  }
  
  return score;
}

// Actions by Score
if (fraudScore >= 80) {
  suspendAccount();
  flagForManualReview();
} else if (fraudScore >= 60) {
  removeVerificationBadge();
  lowerSearchRanking(50);
} else if (fraudScore >= 40) {
  sendWarningNotification();
}
```

## 7. Calendar Sync Logic

```javascript
// Google Calendar 2-Way Sync
async function syncGoogleCalendar(userId) {
  const lastSync = await getLastSyncTime(userId);
  
  // Fetch events from Google Calendar
  const googleEvents = await googleCalendar.events.list({
    calendarId: 'primary',
    timeMin: lastSync,
    timeMax: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // Next 90 days
    singleEvents: true,
    orderBy: 'startTime'
  });
  
  // Fetch events from Platform
  const platformEvents = await db.query(`
    SELECT * FROM calendar_events
    WHERE user_id = $1 AND updated_at > $2
  `, [userId, lastSync]);
  
  // Sync Google → Platform
  for (const gEvent of googleEvents.data.items) {
    const existing = await findPlatformEvent(gEvent.id);
    
    if (!existing) {
      // Create new event in platform
      await createPlatformEvent({
        user_id: userId,
        title: gEvent.summary,
        start_time: gEvent.start.dateTime,
        end_time: gEvent.end.dateTime,
        status: 'busy',
        event_type: 'synced',
        external_calendar_id: gEvent.id
      });
    } else if (gEvent.updated > existing.updated_at) {
      // Update existing event
      await updatePlatformEvent(existing.id, {
        title: gEvent.summary,
        start_time: gEvent.start.dateTime,
        end_time: gEvent.end.dateTime
      });
    }
  }
  
  // Sync Platform → Google
  for (const pEvent of platformEvents) {
    if (pEvent.event_type === 'booking' && pEvent.status === 'confirmed') {
      const gEvent = await findGoogleEvent(pEvent.external_calendar_id);
      
      if (!gEvent) {
        // Create in Google Calendar
        const created = await googleCalendar.events.insert({
          calendarId: 'primary',
          resource: {
            summary: pEvent.title,
            start: { dateTime: pEvent.start_time },
            end: { dateTime: pEvent.end_time },
            description: `Booking from Platform - ID: ${pEvent.booking_id}`
          }
        });
        
        // Store external ID
        await updatePlatformEvent(pEvent.id, {
          external_calendar_id: created.data.id
        });
      }
    }
  }
  
  // Update last sync time
  await updateLastSyncTime(userId, new Date());
}

// Conflict Detection
function detectConflicts(newBooking, existingEvents) {
  const conflicts = [];
  
  for (const event of existingEvents) {
    if (timeRangesOverlap(newBooking, event)) {
      conflicts.push({
        event_id: event.id,
        title: event.title,
        start_time: event.start_time,
        end_time: event.end_time,
        severity: calculateConflictSeverity(newBooking, event)
      });
    }
  }
  
  return conflicts;
}

function timeRangesOverlap(a, b) {
  return (a.start_time < b.end_time) && (a.end_time > b.start_time);
}
```

## 8. Performance Optimization

### 8.1. Caching Strategy

```javascript
// Redis Cache Layers
const CACHE_TTL = {
  profile: 3600,        // 1 hour
  search_results: 300,  // 5 minutes
  social_metrics: 86400, // 24 hours
  static_content: 604800 // 7 days
};

// Cache-Aside Pattern
async function getProfile(profileId) {
  // Try cache first
  const cached = await redis.get(`profile:${profileId}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - fetch from DB
  const profile = await db.query('SELECT * FROM profiles WHERE id = $1', [profileId]);
  
  // Store in cache
  await redis.setex(`profile:${profileId}`, CACHE_TTL.profile, JSON.stringify(profile));
  
  return profile;
}

// Cache Invalidation
async function updateProfile(profileId, updates) {
  // Update database
  await db.query('UPDATE profiles SET ... WHERE id = $1', [profileId]);
  
  // Invalidate cache
  await redis.del(`profile:${profileId}`);
  
  // Invalidate related caches
  await redis.del(`search:*`); // Invalidate all search caches
}
```

### 8.2. Database Optimization

```sql
-- Indexes for common queries
CREATE INDEX idx_profiles_search ON profiles(city, gender, height) WHERE profile_completion_score >= 50;
CREATE INDEX idx_photos_profile_order ON photos(profile_id, display_order);
CREATE INDEX idx_bookings_status_time ON bookings(status, start_time) WHERE status IN ('confirmed', 'in_progress');

-- Materialized View for Analytics
CREATE MATERIALIZED VIEW profile_stats AS
SELECT 
  p.id,
  p.user_id,
  COUNT(DISTINCT ph.id) as photo_count,
  COUNT(DISTINCT v.id) as video_count,
  COUNT(DISTINCT sa.id) as social_account_count,
  MAX(sa.followers_count) as max_followers,
  AVG(b.rating) as avg_rating,
  COUNT(DISTINCT b.id) as booking_count
FROM profiles p
LEFT JOIN photos ph ON p.id = ph.profile_id
LEFT JOIN videos v ON p.id = v.profile_id
LEFT JOIN social_accounts sa ON p.user_id = sa.user_id
LEFT JOIN bookings b ON p.user_id = b.kol_id AND b.status = 'completed'
GROUP BY p.id, p.user_id;

-- Refresh materialized view daily
REFRESH MATERIALIZED VIEW CONCURRENTLY profile_stats;
```

## 9. Security Implementation

### 9.1. Authentication

```javascript
// JWT Token Generation
function generateToken(user) {
  const payload = {
    user_id: user.id,
    email: user.email,
    type: user.type,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'RS256' });
}

// Middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### 9.2. Data Encryption

```javascript
// Encrypt sensitive data
const crypto = require('crypto');

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.ENCRYPTION_KEY, 'hex'), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

function decrypt(encrypted, iv, authTag) {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
```

---

**This technical specification provides complete implementation details for the core features described in Luồng 1.**
