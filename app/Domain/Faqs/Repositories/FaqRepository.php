<?php

namespace App\Domain\Faqs\Repositories;

use App\Domain\Faqs\Models\Faq;
use App\Domain\Shared\Repositories\EloquentRepository;

class FaqRepository extends EloquentRepository
{
    protected string $model = Faq::class;
}
