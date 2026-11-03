<?php

namespace App\Domain\Plans\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends Model
{
    protected $fillable = [
        'name', 'slug', 'price', 'billing_period', 'description',
        'is_featured', 'order', 'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function features(): HasMany
    {
        return $this->hasMany(PlanFeature::class)->orderBy('order');
    }
}
