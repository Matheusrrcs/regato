<?php

namespace App\Domain\Shared\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface RepositoryInterface
{
    public function all(): Collection;

    public function activeOrdered(): Collection;

    public function find(int $id): ?Model;

    public function findBySlug(string $slug): ?Model;

    public function create(array $data): Model;

    public function update(Model $model, array $data): Model;

    public function delete(Model $model): void;
}
