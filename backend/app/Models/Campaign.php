<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Campaign extends Model
{
    protected $fillable = [
        'owner_user_id',
        'title',
        'job_type',
        'description',
        'city',
        'location',
        'start_date',
        'end_date',
        'talent_quantity',
        'budget_min',
        'budget_max',
        'requirements',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'published_at' => 'datetime',
        ];
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function talents(): HasMany
    {
        return $this->hasMany(CampaignTalent::class);
    }
}
