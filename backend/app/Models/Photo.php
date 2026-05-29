<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photo extends Model
{
    protected $fillable = [
        'profile_id',
        'path',
        'url',
        'thumbnail_url',
        'disk',
        'caption',
        'category',
        'width',
        'height',
        'file_size',
        'is_cover',
        'is_primary',
        'ai_tags',
        'sort_order',
        'display_order',
        'uploaded_at',
    ];

    protected function casts(): array
    {
        return [
            'is_cover' => 'boolean',
            'is_primary' => 'boolean',
            'ai_tags' => 'array',
            'uploaded_at' => 'datetime',
        ];
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
