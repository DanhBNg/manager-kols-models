<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialMetricsHistory extends Model
{
    protected $table = 'social_metrics_history';

    protected $fillable = [
        'social_account_id',
        'followers_count',
        'following_count',
        'posts_count',
        'engagement_rate',
        'authenticity_score',
        'recorded_at',
    ];

    protected function casts(): array
    {
        return ['recorded_at' => 'datetime'];
    }

    public function socialAccount(): BelongsTo
    {
        return $this->belongsTo(SocialAccount::class);
    }
}
