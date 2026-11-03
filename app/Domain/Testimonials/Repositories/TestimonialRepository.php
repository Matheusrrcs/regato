<?php

namespace App\Domain\Testimonials\Repositories;

use App\Domain\Shared\Repositories\EloquentRepository;
use App\Domain\Testimonials\Models\Testimonial;

class TestimonialRepository extends EloquentRepository
{
    protected string $model = Testimonial::class;
}
