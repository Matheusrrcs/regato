<?php

namespace App\Domain\Process\Repositories;

use App\Domain\Process\Models\ProcessStep;
use App\Domain\Shared\Repositories\EloquentRepository;

class ProcessRepository extends EloquentRepository
{
    protected string $model = ProcessStep::class;
}
