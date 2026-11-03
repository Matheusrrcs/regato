<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Contact\Models\ContactMessage;
use App\Domain\Faqs\Models\Faq;
use App\Domain\Plans\Models\Plan;
use App\Domain\Portfolio\Models\PortfolioProject;
use App\Domain\Services\Models\Service;
use App\Domain\Testimonials\Models\Testimonial;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'services' => Service::query()->count(),
                'plans' => Plan::query()->count(),
                'portfolio' => PortfolioProject::query()->count(),
                'testimonials' => Testimonial::query()->count(),
                'faqs' => Faq::query()->count(),
                'unread_messages' => ContactMessage::query()->where('is_read', false)->count(),
            ],
        ]);
    }
}
