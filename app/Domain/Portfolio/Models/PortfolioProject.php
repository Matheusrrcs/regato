<?php

namespace App\Domain\Portfolio\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'client', 'project_url',
        'cover_image', 'desktop_screenshot', 'mobile_screenshot', 'gallery',
        'summary', 'content', 'order', 'is_active',
    ];

    protected $casts = [
        'gallery' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
