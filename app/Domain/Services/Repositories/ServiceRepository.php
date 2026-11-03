<?php

namespace App\Domain\Services\Repositories;

use App\Domain\Services\Models\Service;
use App\Domain\Shared\Repositories\EloquentRepository;

class ServiceRepository extends EloquentRepository
{
    protected string $model = Service::class;
}
