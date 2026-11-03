<?php

namespace App\Domain\Process\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessStep extends Model
{
    protected $fillable = ['title', 'description', 'icon', 'order', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
