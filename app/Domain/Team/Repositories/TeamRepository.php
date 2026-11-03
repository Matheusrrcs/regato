<?php

namespace App\Domain\Team\Repositories;

use App\Domain\Shared\Repositories\EloquentRepository;
use App\Domain\Team\Models\TeamMember;

class TeamRepository extends EloquentRepository
{
    protected string $model = TeamMember::class;
}
