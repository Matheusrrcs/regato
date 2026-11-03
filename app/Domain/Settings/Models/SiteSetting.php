<?php

namespace App\Domain\Settings\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['group', 'key', 'value', 'type'];
}
