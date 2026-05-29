<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageantRecommendation extends Model
{
    protected $fillable = ['user_id', 'pageant_name', 'match_score', 'reasoning', 'recommended_at'];

    protected function casts(): array
    {
        return [
            'match_score' => 'decimal:2',
            'recommended_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
