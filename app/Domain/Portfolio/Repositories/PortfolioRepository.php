<?php

namespace App\Domain\Portfolio\Repositories;

use App\Domain\Portfolio\Models\PortfolioProject;
use App\Domain\Shared\Repositories\EloquentRepository;

class PortfolioRepository extends EloquentRepository
{
    protected string $model = PortfolioProject::class;
}
