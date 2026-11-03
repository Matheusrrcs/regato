<?php

namespace App\Domain\Settings\Support;

use App\Domain\Settings\Models\SiteSetting;
use Illuminate\Support\Facades\Cache;

class Settings
{
    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::rememberForever(
            "site_setting.{$key}",
            fn () => SiteSetting::query()->where('key', $key)->value('value') ?? $default
        );
    }

    /**
     * Return every setting as an associative array, keyed by setting key.
     */
    public static function all(): array
    {
        return Cache::rememberForever(
            'site_setting.all',
            fn () => SiteSetting::query()->pluck('value', 'key')->all()
        );
    }

    public static function set(string $key, ?string $value, string $group = 'general', string $type = 'text'): void
    {
        SiteSetting::query()->updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'group' => $group, 'type' => $type]
        );

        Cache::forget("site_setting.{$key}");
        Cache::forget('site_setting.all');
    }

    public static function forget(): void
    {
        foreach (SiteSetting::query()->pluck('key') as $key) {
            Cache::forget("site_setting.{$key}");
        }

        Cache::forget('site_setting.all');
    }
}
