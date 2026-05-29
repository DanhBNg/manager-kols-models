<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'display_name',
        'slug',
        'talent_types',
        'city',
        'district',
        'gender',
        'birth_date',
        'height_cm',
        'weight_kg',
        'measurements',
        'skin_tone',
        'hair_color',
        'has_tattoo',
        'tattoo_description',
        'languages',
        'experience',
        'skills',
        'experience_years',
        'work_radius',
        'preferred_cities',
        'bio',
        'budget_min',
        'budget_max',
        'tier',
        'tier_updated_at',
        'agency_badge',
        'profile_completion',
        'rating',
        'verification_status',
        'is_public',
    ];

    protected function casts(): array
    {
        return [
            'talent_types' => 'array',
            'skills' => 'array',
            'languages' => 'array',
            'preferred_cities' => 'array',
            'birth_date' => 'date',
            'rating' => 'decimal:2',
            'has_tattoo' => 'boolean',
            'is_public' => 'boolean',
            'tier_updated_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }

    public function socialAccounts(): HasMany
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function calendarEvents(): HasMany
    {
        return $this->hasMany(CalendarEvent::class);
    }

    public function scopePublic(Builder $query): Builder
    {
        return $query->where('is_public', true);
    }
}
