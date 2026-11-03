<?php

namespace App\Domain\Plans\Models;

use Illuminate\Database\Eloquent\Model;

class PlanFeature extends Model
{
    protected $fillable = ['plan_id', 'feature', 'is_included', 'order'];

    protected $casts = [
        'is_included' => 'boolean',
        'order' => 'integer',
    ];
}
