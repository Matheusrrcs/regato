<?php

namespace App\Domain\Shared\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentRepository implements RepositoryInterface
{
    /** @var class-string<Model> */
    protected string $model;

    public function all(): Collection
    {
        return $this->model::query()->orderBy('order')->get();
    }

    public function activeOrdered(): Collection
    {
        return $this->model::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->get();
    }

    public function find(int $id): ?Model
    {
        return $this->model::query()->find($id);
    }

    public function findBySlug(string $slug): ?Model
    {
        return $this->model::query()->where('slug', $slug)->first();
    }

    public function create(array $data): Model
    {
        return $this->model::query()->create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function delete(Model $model): void
    {
        $model->delete();
    }
}
