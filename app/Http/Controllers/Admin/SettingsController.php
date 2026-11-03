<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Settings\Support\Settings;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function edit(): Response
    {
        $groups = config('site_settings.groups');
        $values = Settings::all();

        foreach ($groups as &$group) {
            foreach ($group['fields'] as &$field) {
                $field['value'] = $values[$field['key']] ?? $field['default'];
            }
        }

        return Inertia::render('Admin/Settings/Edit', [
            'groups' => $groups,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $groups = config('site_settings.groups');

        foreach ($groups as $groupKey => $group) {
            foreach ($group['fields'] as $field) {
                $key = $field['key'];

                if ($field['type'] === 'image') {
                    if ($request->hasFile($key)) {
                        $path = $request->file($key)->store('uploads', 'public');
                        Settings::set($key, $path, $groupKey, $field['type']);
                    }

                    continue;
                }

                Settings::set($key, $request->input($key), $groupKey, $field['type']);
            }
        }

        return back()->with('success', 'Configurações salvas com sucesso.');
    }
}
