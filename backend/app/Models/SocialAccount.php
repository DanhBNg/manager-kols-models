<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialAccount extends Model
{
    protected $fillable = [
        'user_id',
        'profile_id',
        'platform',
        'platform_user_id',
        'username',
        'handle',
        'url',
        'access_token',
        'refresh_token',
        'token_expires_at',
        'last_synced_at',
        'followers_count',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'token_expires_at' => 'datetime',
            'last_synced_at' => 'datetime',
        ];
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    public function metricsHistory()
    {
        return $this->hasMany(SocialMetricsHistory::class);
    }
}
