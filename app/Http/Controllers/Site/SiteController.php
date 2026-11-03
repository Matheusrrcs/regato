<?php

namespace App\Http\Controllers\Site;

use App\Domain\Contact\Repositories\ContactMessageRepository;
use App\Domain\Faqs\Repositories\FaqRepository;
use App\Domain\Plans\Repositories\PlanRepository;
use App\Domain\Portfolio\Repositories\PortfolioRepository;
use App\Domain\Process\Repositories\ProcessRepository;
use App\Domain\Services\Repositories\ServiceRepository;
use App\Domain\Settings\Support\Settings;
use App\Domain\Team\Repositories\TeamRepository;
use App\Domain\Testimonials\Repositories\TestimonialRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SiteController extends Controller
{
    public function home(ServiceRepository $services, TestimonialRepository $testimonials, PortfolioRepository $portfolio, ProcessRepository $process): Response
    {
        return Inertia::render('Site/Home', [
            'settings' => Settings::all(),
            'services' => $services->activeOrdered(),
            'steps' => $process->activeOrdered(),
            'testimonials' => $testimonials->activeOrdered(),
            'projects' => $portfolio->activeOrdered()->take(6)->values(),
        ]);
    }

    public function about(TeamRepository $team): Response
    {
        return Inertia::render('Site/Sobre', [
            'settings' => Settings::all(),
            'team' => $team->activeOrdered(),
        ]);
    }

    public function services(ServiceRepository $services): Response
    {
        return Inertia::render('Site/Servicos', [
            'settings' => Settings::all(),
            'services' => $services->activeOrdered(),
        ]);
    }

    public function portfolioIndex(PortfolioRepository $portfolio): Response
    {
        return Inertia::render('Site/PortfolioIndex', [
            'settings' => Settings::all(),
            'projects' => $portfolio->activeOrdered(),
        ]);
    }

    public function portfolioShow(PortfolioRepository $portfolio, string $slug): Response
    {
        $project = $portfolio->findBySlug($slug);

        abort_if($project === null || ! $project->is_active, 404);

        $projects = $portfolio->activeOrdered()->values();
        $index = $projects->search(fn ($item) => $item->is($project));
        $next = $projects->count() > 1 ? $projects[($index + 1) % $projects->count()] : null;

        return Inertia::render('Site/PortfolioShow', [
            'settings' => Settings::all(),
            'project' => $project,
            'next' => $next?->only(['title', 'slug', 'category', 'cover_image']),
        ]);
    }

    public function plans(PlanRepository $plans): Response
    {
        return Inertia::render('Site/Planos', [
            'settings' => Settings::all(),
            'plans' => $plans->activeOrdered(),
        ]);
    }

    public function process(ProcessRepository $process): Response
    {
        return Inertia::render('Site/Processo', [
            'settings' => Settings::all(),
            'steps' => $process->activeOrdered(),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('Site/Contato', [
            'settings' => Settings::all(),
        ]);
    }

    public function contactStore(Request $request, ContactMessageRepository $messages): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        $messages->create($data);

        return back()->with('success', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
    }

    public function faq(FaqRepository $faqs): Response
    {
        return Inertia::render('Site/Faq', [
            'settings' => Settings::all(),
            'faqs' => $faqs->activeOrdered(),
        ]);
    }

    public function privacy(): Response
    {
        return Inertia::render('Site/Privacidade', [
            'settings' => Settings::all(),
        ]);
    }

    public function terms(): Response
    {
        return Inertia::render('Site/Termos', [
            'settings' => Settings::all(),
        ]);
    }
}
