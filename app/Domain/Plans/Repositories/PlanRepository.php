<?php

namespace App\Domain\Plans\Repositories;

use App\Domain\Plans\Models\Plan;
use App\Domain\Shared\Repositories\EloquentRepository;

class PlanRepository extends EloquentRepository
{
    protected string $model = Plan::class;

    public function activeOrdered(): \Illuminate\Database\Eloquent\Collection
    {
        return Plan::query()->with('features')->where('is_active', true)->orderBy('order')->get();
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return Plan::query()->with('features')->orderBy('order')->get();
    }

    /**
     * Replace all features of a plan from a plain array of feature labels.
     */
    public function syncFeatures(Plan $plan, array $features): void
    {
        $plan->features()->delete();

        foreach (array_values($features) as $index => $feature) {
            $feature = trim($feature);

            if ($feature === '') {
                continue;
            }

            $plan->features()->create([
                'feature' => $feature,
                'is_included' => true,
                'order' => $index,
            ]);
        }
    }
}
