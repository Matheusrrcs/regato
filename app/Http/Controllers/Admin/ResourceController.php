<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Plans\Repositories\PlanRepository;
use App\Domain\Shared\Repositories\EloquentRepository;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ResourceController extends Controller
{
    protected function config(string $resource): array
    {
        $config = config("admin_resources.{$resource}");

        abort_if($config === null, HttpResponse::HTTP_NOT_FOUND);

        return $config;
    }

    protected function repository(array $config): EloquentRepository
    {
        return app($config['repository']);
    }

    public function index(string $resource): Response
    {
        $config = $this->config($resource);

        return Inertia::render('Admin/Resources/Index', [
            'resource' => $resource,
            'label' => $config['label'],
            'singular' => $config['singular'],
            'fields' => $config['fields'],
            'titleField' => $config['title_field'],
            'items' => $this->repository($config)->all(),
        ]);
    }

    public function create(string $resource): Response
    {
        $config = $this->config($resource);

        return Inertia::render('Admin/Resources/Form', [
            'resource' => $resource,
            'label' => $config['label'],
            'singular' => $config['singular'],
            'fields' => $config['fields'],
            'item' => null,
        ]);
    }

    public function edit(string $resource, int $id): Response
    {
        $config = $this->config($resource);
        $model = $this->repository($config)->find($id);

        abort_if($model === null, HttpResponse::HTTP_NOT_FOUND);

        $item = $model->toArray();

        if (! empty($config['has_features'])) {
            $item['features_text'] = $model->features->pluck('feature')->implode("\n");
        }

        return Inertia::render('Admin/Resources/Form', [
            'resource' => $resource,
            'label' => $config['label'],
            'singular' => $config['singular'],
            'fields' => $config['fields'],
            'item' => $item,
        ]);
    }

    public function store(Request $request, string $resource): RedirectResponse
    {
        $config = $this->config($resource);
        $data = $this->validateResource($request, $config);

        $model = $this->repository($config)->create($data);

        $this->syncFeaturesIfNeeded($config, $model, $request);

        return to_route('admin.resources.index', $resource)
            ->with('success', "{$config['singular']} criado com sucesso.");
    }

    public function update(Request $request, string $resource, int $id): RedirectResponse
    {
        $config = $this->config($resource);
        $repository = $this->repository($config);
        $model = $repository->find($id);

        abort_if($model === null, HttpResponse::HTTP_NOT_FOUND);

        $data = $this->validateResource($request, $config, $model);

        $repository->update($model, $data);

        $this->syncFeaturesIfNeeded($config, $model, $request);

        return to_route('admin.resources.index', $resource)
            ->with('success', "{$config['singular']} atualizado com sucesso.");
    }

    public function destroy(string $resource, int $id): RedirectResponse
    {
        $config = $this->config($resource);
        $repository = $this->repository($config);
        $model = $repository->find($id);

        abort_if($model === null, HttpResponse::HTTP_NOT_FOUND);

        $repository->delete($model);

        return to_route('admin.resources.index', $resource)
            ->with('success', "{$config['singular']} removido com sucesso.");
    }

    protected function validateResource(Request $request, array $config, ?Model $model = null): array
    {
        $rules = [];

        foreach ($config['fields'] as $field) {
            $name = $field['name'];
            $type = $field['type'];
            $required = ! empty($field['required']);

            $rule = [$required ? 'required' : 'nullable'];
            $max = $field['max'] ?? 4096;

            if ($type === 'gallery') {
                $rules["{$name}_keep"] = ['nullable', 'array'];
                $rules["{$name}_keep.*"] = ['string'];
                $rules["{$name}_upload"] = ['nullable', 'array'];
                $rules["{$name}_upload.*"] = ['image', "max:{$max}"];

                continue;
            }

            match ($type) {
                'number' => $rule[] = 'numeric',
                'checkbox' => $rule = ['sometimes', 'boolean'],
                'image' => array_push($rule, 'image', "max:{$max}"),
                default => $rule[] = 'string',
            };

            if ($name === 'slug') {
                $rule[] = Rule::unique($config['model']::query()->getModel()->getTable(), 'slug')
                    ->ignore($model?->id);
            }

            $rules[$name] = $rule;
        }

        $validated = $request->validate($rules);

        foreach ($config['fields'] as $field) {
            if ($field['type'] === 'checkbox') {
                $validated[$field['name']] = $request->boolean($field['name']);
            }

            if ($field['type'] === 'gallery') {
                $validated[$field['name']] = $this->syncGallery($request, $field['name'], $model);
                unset($validated["{$field['name']}_keep"], $validated["{$field['name']}_upload"]);

                continue;
            }

            if ($field['type'] === 'image' && $request->hasFile($field['name'])) {
                $validated[$field['name']] = $request->file($field['name'])->store('uploads', 'public');
            } elseif ($field['type'] === 'image') {
                unset($validated[$field['name']]);
            }
        }

        unset($validated['features_text']);

        return $validated;
    }

    /**
     * Mantém as imagens que continuam na galeria (só as que já pertenciam ao
     * registro), acrescenta as enviadas e apaga do disco as removidas.
     *
     * @return list<string>
     */
    protected function syncGallery(Request $request, string $name, ?Model $model): array
    {
        $current = (array) ($model?->getAttribute($name) ?? []);
        $keep = array_values(array_intersect((array) $request->input("{$name}_keep", []), $current));

        $uploaded = array_map(
            fn ($file) => $file->store('uploads', 'public'),
            (array) $request->file("{$name}_upload", []),
        );

        Storage::disk('public')->delete(array_values(array_diff($current, $keep)));

        return [...$keep, ...$uploaded];
    }

    protected function syncFeaturesIfNeeded(array $config, Model $model, Request $request): void
    {
        if (empty($config['has_features'])) {
            return;
        }

        /** @var PlanRepository $repository */
        $repository = $this->repository($config);
        $features = explode("\n", (string) $request->input('features_text', ''));

        $repository->syncFeatures($model, $features);
    }
}
