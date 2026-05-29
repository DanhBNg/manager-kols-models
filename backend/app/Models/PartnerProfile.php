<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PartnerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'organization_name',
        'organization_type',
        'industry',
        'website_url',
        'fanpage_url',
        'contact_name',
        'contact_phone',
        'contact_email',
        'city',
        'description',
        'verification_status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
