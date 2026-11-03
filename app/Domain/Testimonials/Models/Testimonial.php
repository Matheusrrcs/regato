<?php

namespace App\Domain\Testimonials\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'author_name', 'author_role', 'company', 'avatar',
        'content', 'rating', 'order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'rating' => 'integer',
    ];
}
