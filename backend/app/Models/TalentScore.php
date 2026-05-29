<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TalentScore extends Model
{
    protected $fillable = ['user_id', 'criterion_code', 'score', 'tier', 'calculated_at'];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'calculated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
