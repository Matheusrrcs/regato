<?php

use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Site\SiteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SiteController::class, 'home'])->name('home');
Route::get('/sobre', [SiteController::class, 'about'])->name('sobre');
Route::get('/servicos', [SiteController::class, 'services'])->name('servicos');
Route::get('/portfolio', [SiteController::class, 'portfolioIndex'])->name('portfolio.index');
Route::get('/portfolio/{slug}', [SiteController::class, 'portfolioShow'])->name('portfolio.show');
Route::get('/planos', [SiteController::class, 'plans'])->name('planos');
Route::get('/processo', [SiteController::class, 'process'])->name('processo');
Route::get('/contato', [SiteController::class, 'contact'])->name('contato');
Route::post('/contato', [SiteController::class, 'contactStore'])->name('contato.store');
Route::get('/faq', [SiteController::class, 'faq'])->name('faq');
Route::get('/privacidade', [SiteController::class, 'privacy'])->name('privacidade');
Route::get('/termos', [SiteController::class, 'terms'])->name('termos');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth')->name('logout');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->middleware('guest')->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('guest');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
    Route::post('/messages/{id}/read', [ContactMessageController::class, 'markAsRead'])->name('messages.read');
    Route::delete('/messages/{id}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');

    Route::get('/{resource}', [ResourceController::class, 'index'])->name('resources.index');
    Route::get('/{resource}/create', [ResourceController::class, 'create'])->name('resources.create');
    Route::post('/{resource}', [ResourceController::class, 'store'])->name('resources.store');
    Route::get('/{resource}/{id}/edit', [ResourceController::class, 'edit'])->whereNumber('id')->name('resources.edit');
    Route::put('/{resource}/{id}', [ResourceController::class, 'update'])->whereNumber('id')->name('resources.update');
    Route::delete('/{resource}/{id}', [ResourceController::class, 'destroy'])->whereNumber('id')->name('resources.destroy');
});
