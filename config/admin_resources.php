<?php

use App\Domain\Faqs\Models\Faq;
use App\Domain\Faqs\Repositories\FaqRepository;
use App\Domain\Plans\Models\Plan;
use App\Domain\Plans\Repositories\PlanRepository;
use App\Domain\Portfolio\Models\PortfolioProject;
use App\Domain\Portfolio\Repositories\PortfolioRepository;
use App\Domain\Process\Models\ProcessStep;
use App\Domain\Process\Repositories\ProcessRepository;
use App\Domain\Services\Models\Service;
use App\Domain\Services\Repositories\ServiceRepository;
use App\Domain\Team\Models\TeamMember;
use App\Domain\Team\Repositories\TeamRepository;
use App\Domain\Testimonials\Models\Testimonial;
use App\Domain\Testimonials\Repositories\TestimonialRepository;

return [

    'services' => [
        'label' => 'Serviços',
        'singular' => 'Serviço',
        'model' => Service::class,
        'repository' => ServiceRepository::class,
        'title_field' => 'title',
        'fields' => [
            ['name' => 'title', 'label' => 'Título', 'type' => 'text', 'required' => true],
            ['name' => 'slug', 'label' => 'Slug (URL)', 'type' => 'text', 'required' => true],
            ['name' => 'icon', 'label' => 'Ícone (nome ou classe)', 'type' => 'text'],
            ['name' => 'description', 'label' => 'Descrição', 'type' => 'textarea'],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'plans' => [
        'label' => 'Planos',
        'singular' => 'Plano',
        'model' => Plan::class,
        'repository' => PlanRepository::class,
        'title_field' => 'name',
        'has_features' => true,
        'fields' => [
            ['name' => 'name', 'label' => 'Nome', 'type' => 'text', 'required' => true],
            ['name' => 'slug', 'label' => 'Slug (URL)', 'type' => 'text', 'required' => true],
            ['name' => 'price', 'label' => 'Preço', 'type' => 'number'],
            ['name' => 'billing_period', 'label' => 'Periodicidade', 'type' => 'text'],
            ['name' => 'description', 'label' => 'Descrição', 'type' => 'textarea'],
            ['name' => 'features_text', 'label' => 'Recursos (um por linha)', 'type' => 'textarea'],
            ['name' => 'is_featured', 'label' => 'Destaque', 'type' => 'checkbox'],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'portfolio' => [
        'label' => 'Portfólio',
        'singular' => 'Projeto',
        'model' => PortfolioProject::class,
        'repository' => PortfolioRepository::class,
        'title_field' => 'title',
        'fields' => [
            ['name' => 'title', 'label' => 'Título', 'type' => 'text', 'required' => true],
            ['name' => 'slug', 'label' => 'Slug (URL)', 'type' => 'text', 'required' => true],
            ['name' => 'category', 'label' => 'Categoria', 'type' => 'text'],
            ['name' => 'client', 'label' => 'Cliente', 'type' => 'text'],
            ['name' => 'project_url', 'label' => 'Link do projeto', 'type' => 'text'],
            ['name' => 'cover_image', 'label' => 'Imagem de capa', 'type' => 'image'],
            ['name' => 'summary', 'label' => 'Resumo', 'type' => 'textarea'],
            ['name' => 'content', 'label' => 'Conteúdo completo', 'type' => 'textarea'],
            [
                'name' => 'desktop_screenshot', 'label' => 'Site — print da página inteira (desktop)', 'type' => 'image', 'max' => 12288,
                'help' => 'Print de página inteira, de cima a baixo, com 1440px de largura. Deixe vazio se o projeto não tiver site.',
            ],
            [
                'name' => 'mobile_screenshot', 'label' => 'Site — print da página inteira (mobile)', 'type' => 'image', 'max' => 12288,
                'help' => 'Print de página inteira com cerca de 390px de largura.',
            ],
            [
                'name' => 'gallery', 'label' => 'Identidade visual — imagens', 'type' => 'gallery', 'max' => 8192,
                'help' => 'Logo, paleta, tipografia, aplicações, papelaria... Aparecem na ordem enviada. Deixe vazio se o projeto não tiver identidade visual.',
            ],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'testimonials' => [
        'label' => 'Depoimentos',
        'singular' => 'Depoimento',
        'model' => Testimonial::class,
        'repository' => TestimonialRepository::class,
        'title_field' => 'author_name',
        'fields' => [
            ['name' => 'author_name', 'label' => 'Nome', 'type' => 'text', 'required' => true],
            ['name' => 'author_role', 'label' => 'Cargo', 'type' => 'text'],
            ['name' => 'company', 'label' => 'Empresa', 'type' => 'text'],
            ['name' => 'avatar', 'label' => 'Foto', 'type' => 'image'],
            ['name' => 'content', 'label' => 'Depoimento', 'type' => 'textarea', 'required' => true],
            ['name' => 'rating', 'label' => 'Nota (1-5)', 'type' => 'number'],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'faqs' => [
        'label' => 'Perguntas Frequentes',
        'singular' => 'Pergunta',
        'model' => Faq::class,
        'repository' => FaqRepository::class,
        'title_field' => 'question',
        'fields' => [
            ['name' => 'question', 'label' => 'Pergunta', 'type' => 'text', 'required' => true],
            ['name' => 'answer', 'label' => 'Resposta', 'type' => 'textarea', 'required' => true],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'team' => [
        'label' => 'Equipe',
        'singular' => 'Membro',
        'model' => TeamMember::class,
        'repository' => TeamRepository::class,
        'title_field' => 'name',
        'fields' => [
            ['name' => 'name', 'label' => 'Nome', 'type' => 'text', 'required' => true],
            ['name' => 'role', 'label' => 'Cargo', 'type' => 'text'],
            ['name' => 'photo', 'label' => 'Foto', 'type' => 'image'],
            ['name' => 'bio', 'label' => 'Biografia', 'type' => 'textarea'],
            ['name' => 'linkedin_url', 'label' => 'LinkedIn', 'type' => 'text'],
            ['name' => 'instagram_url', 'label' => 'Instagram', 'type' => 'text'],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

    'process' => [
        'label' => 'Processo de Trabalho',
        'singular' => 'Etapa',
        'model' => ProcessStep::class,
        'repository' => ProcessRepository::class,
        'title_field' => 'title',
        'fields' => [
            ['name' => 'title', 'label' => 'Título', 'type' => 'text', 'required' => true],
            ['name' => 'description', 'label' => 'Descrição', 'type' => 'textarea'],
            ['name' => 'icon', 'label' => 'Ícone (nome ou classe)', 'type' => 'text'],
            ['name' => 'order', 'label' => 'Ordem', 'type' => 'number'],
            ['name' => 'is_active', 'label' => 'Ativo', 'type' => 'checkbox'],
        ],
    ],

];
