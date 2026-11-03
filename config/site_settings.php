<?php

return [
    'groups' => [
        'geral' => [
            'label' => 'Geral',
            'fields' => [
                ['key' => 'site_name', 'label' => 'Nome do site', 'type' => 'text', 'default' => 'Regato'],
                ['key' => 'tagline', 'label' => 'Slogan', 'type' => 'text', 'default' => 'Estúdio de criação de sites, identidade visual e design digital. Marcas que traduzem o que você é.'],
                ['key' => 'logo', 'label' => 'Logo', 'type' => 'image', 'default' => null],
                ['key' => 'favicon', 'label' => 'Favicon', 'type' => 'image', 'default' => null],
            ],
        ],
        'home' => [
            'label' => 'Página Inicial',
            'fields' => [
                ['key' => 'hero_title', 'label' => 'Título do banner', 'type' => 'text', 'default' => 'Ideias que ganham movimento'],
                ['key' => 'hero_subtitle', 'label' => 'Subtítulo do banner', 'type' => 'textarea', 'default' => 'Criamos sites, marcas e sistemas visuais que traduzem o que o seu negócio é — com processo claro, prazo combinado e decisões que têm motivo.'],
                ['key' => 'hero_image', 'label' => 'Imagem do banner', 'type' => 'image', 'default' => null],
                ['key' => 'hero_cta_text', 'label' => 'Texto do botão', 'type' => 'text', 'default' => 'Começar um projeto'],
                ['key' => 'hero_cta_url', 'label' => 'Link do botão', 'type' => 'text', 'default' => '/contato'],
            ],
        ],
        'sobre' => [
            'label' => 'Sobre',
            'fields' => [
                ['key' => 'about_title', 'label' => 'Título', 'type' => 'text', 'default' => 'Sobre nós'],
                ['key' => 'about_content', 'label' => 'Conteúdo', 'type' => 'textarea', 'default' => 'Somos um estúdio de criação de sites, identidade visual e design digital. Acompanhamos cada etapa do projeto de perto, com prazo combinado e decisões que sempre têm um motivo ligado ao seu negócio.'],
                ['key' => 'about_image', 'label' => 'Imagem', 'type' => 'image', 'default' => null],
            ],
        ],
        'contato' => [
            'label' => 'Contato',
            'fields' => [
                ['key' => 'contact_email', 'label' => 'E-mail', 'type' => 'text', 'default' => 'contato@regato.studio'],
                ['key' => 'contact_phone', 'label' => 'Telefone', 'type' => 'text', 'default' => '+55 (11) 98888-1234'],
                ['key' => 'contact_whatsapp', 'label' => 'WhatsApp', 'type' => 'text', 'default' => '5511988881234'],
                ['key' => 'contact_address', 'label' => 'Endereço', 'type' => 'textarea', 'default' => 'São Paulo, SP — atendimento em todo o Brasil'],
            ],
        ],
        'redes' => [
            'label' => 'Redes Sociais',
            'fields' => [
                ['key' => 'social_instagram', 'label' => 'Instagram', 'type' => 'text', 'default' => ''],
                ['key' => 'social_facebook', 'label' => 'Facebook', 'type' => 'text', 'default' => ''],
                ['key' => 'social_linkedin', 'label' => 'LinkedIn', 'type' => 'text', 'default' => ''],
                ['key' => 'social_behance', 'label' => 'Behance', 'type' => 'text', 'default' => ''],
            ],
        ],
        'seo' => [
            'label' => 'SEO',
            'fields' => [
                ['key' => 'seo_default_title', 'label' => 'Título padrão', 'type' => 'text', 'default' => 'Regato'],
                ['key' => 'seo_default_description', 'label' => 'Descrição padrão', 'type' => 'textarea', 'default' => ''],
            ],
        ],
        'juridico' => [
            'label' => 'Jurídico',
            'fields' => [
                ['key' => 'privacy_content', 'label' => 'Política de Privacidade', 'type' => 'textarea', 'default' => ''],
                ['key' => 'terms_content', 'label' => 'Termos de Serviço', 'type' => 'textarea', 'default' => ''],
            ],
        ],
    ],
];
