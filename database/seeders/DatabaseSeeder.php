<?php

namespace Database\Seeders;

use App\Domain\Faqs\Models\Faq;
use App\Domain\Plans\Models\Plan;
use App\Domain\Portfolio\Models\PortfolioProject;
use App\Domain\Process\Models\ProcessStep;
use App\Domain\Services\Models\Service;
use App\Domain\Settings\Support\Settings;
use App\Domain\Team\Models\TeamMember;
use App\Domain\Testimonials\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@regato.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
        ]);

        foreach ([
            [
                'title' => 'Criação de Sites', 'slug' => 'criacao-de-sites', 'icon' => 'globe',
                'description' => 'Sites modernos, rápidos e personalizados, feitos para converter.', 'order' => 1,
            ],
            [
                'title' => 'Identidade Visual', 'slug' => 'identidade-visual', 'icon' => 'palette',
                'description' => 'Marcas com propósito, coerentes em todos os pontos de contato.', 'order' => 2,
            ],
            [
                'title' => 'Design Digital', 'slug' => 'design-digital', 'icon' => 'layers',
                'description' => 'Experiências que conectam pessoas e ideias no dia a dia.', 'order' => 3,
            ],
        ] as $service) {
            Service::query()->create($service);
        }

        foreach ([
            [
                'name' => 'Essencial', 'slug' => 'essencial', 'price' => 4900, 'billing_period' => 'projeto único',
                'description' => 'Uma presença digital bem feita para começar.', 'order' => 1,
                'features' => ['Site de até 4 páginas', 'Design exclusivo e responsivo', 'Formulário de contato e WhatsApp', '30 dias de suporte'],
            ],
            [
                'name' => 'Movimento', 'slug' => 'movimento', 'price' => 11800, 'billing_period' => 'projeto único',
                'description' => 'Marca e site nascendo juntos, com a mesma voz.', 'is_featured' => true, 'order' => 2,
                'features' => ['Identidade visual completa com manual', 'Site de até 8 páginas', 'Sistema gráfico e modelos para redes', '90 dias de suporte'],
            ],
            [
                'name' => 'Presença', 'slug' => 'presenca', 'price' => 3200, 'billing_period' => 'por mês',
                'description' => 'O estúdio junto do seu time, todo mês.', 'order' => 3,
                'features' => ['Horas mensais de design dedicadas', 'Peças para redes e campanhas', 'Landing pages sob demanda', 'Reunião quinzenal de prioridades'],
            ],
        ] as $data) {
            $features = $data['features'];
            unset($data['features']);

            $plan = Plan::query()->create($data);

            foreach ($features as $index => $feature) {
                $plan->features()->create(['feature' => $feature, 'order' => $index + 1]);
            }
        }

        foreach ([
            [
                'title' => 'Vale Verde Café', 'slug' => 'vale-verde-cafe', 'category' => 'Identidade Visual',
                'client' => 'Vale Verde Café', 'order' => 1,
                'summary' => 'Identidade completa para um torrefador de café de montanha, do símbolo à embalagem.',
                'content' => 'Criamos um sistema visual inspirado nas curvas de nível da serra, com papelaria e embalagens que contam a origem de cada lote. Resultado: entrada em 12 cafeterias no primeiro semestre.',
            ],
            [
                'title' => 'Corrente Arquitetura', 'slug' => 'corrente-arquitetura', 'category' => 'Criação de Sites',
                'client' => 'Corrente Arquitetura', 'order' => 2,
                'summary' => 'Site-portfólio para um escritório de arquitetura residencial, com foco em captação de projetos.',
                'content' => 'Um site enxuto, com páginas de projeto em formato de história e um caminho curto até o formulário de orçamento. Resultado: 22 pedidos de orçamento qualificados nos três primeiros meses.',
            ],
            [
                'title' => 'Musgo Botânica', 'slug' => 'musgo-botanica', 'category' => 'Design Digital',
                'client' => 'Musgo Botânica', 'order' => 3,
                'summary' => 'Sistema de peças e loja digital para uma marca de plantas raras.',
                'content' => 'Criamos um design system leve, com modelos editáveis para redes, e-mail e campanhas sazonais. Resultado: produção de conteúdo três vezes mais rápida.',
            ],
        ] as $project) {
            PortfolioProject::query()->create($project);
        }

        foreach ([
            ['author_name' => 'Helena Braz', 'author_role' => 'Sócia, Vale Verde Café', 'content' => 'O processo é claro do início ao fim. Em nenhum momento ficamos no escuro sobre o que vinha a seguir.', 'order' => 1],
            ['author_name' => 'Rafael Pinho', 'author_role' => 'Sócio, Corrente Arquitetura', 'content' => 'Entregaram mais do que um site: entregaram uma forma de explicar o nosso trabalho.', 'order' => 2],
            ['author_name' => 'Amanda Ferraz', 'author_role' => 'Diretora, Raiz Consultoria', 'content' => 'A equipe entendeu o campo e traduziu isso em uma marca que o produtor respeita.', 'order' => 3],
        ] as $testimonial) {
            Testimonial::query()->create($testimonial);
        }

        foreach ([
            ['question' => 'Quanto custa um projeto com a Regato?', 'answer' => 'Sites a partir de R$ 4.900 e identidade visual completa a partir de R$ 7.500. O valor final depende do escopo. Veja os pacotes fechados na página de Planos.', 'order' => 1],
            ['question' => 'Qual é o prazo médio de entrega?', 'answer' => 'Um site institucional leva de 3 a 6 semanas. Uma identidade visual completa leva de 4 a 8 semanas.', 'order' => 2],
            ['question' => 'Como funciona o pagamento?', 'answer' => 'Normalmente 40% na assinatura da proposta e 60% na entrega final, com parcelamento em até 4 vezes.', 'order' => 3],
            ['question' => 'Vocês escrevem os textos do site?', 'answer' => 'Sim. Trabalhamos os textos junto com você em uma sessão de conteúdo e entregamos tudo revisado.', 'order' => 4],
        ] as $faq) {
            Faq::query()->create($faq);
        }

        foreach ([
            ['title' => 'Conversa inicial', 'description' => 'Entendemos o negócio, os objetivos e o momento. Saímos daqui com escopo, prazo e investimento definidos.', 'order' => 1],
            ['title' => 'Imersão e estratégia', 'description' => 'Pesquisa de mercado, conversa com o público e definição de posicionamento.', 'order' => 2],
            ['title' => 'Conceito', 'description' => 'Apresentamos o caminho criativo com justificativa antes de qualquer arte final.', 'order' => 3],
            ['title' => 'Design', 'description' => 'Marca, telas e peças ganham forma, com entregas parciais e sem surpresa no final.', 'order' => 4],
            ['title' => 'Desenvolvimento', 'description' => 'Construção do site com foco em velocidade, acessibilidade e busca.', 'order' => 5],
            ['title' => 'Entrega e acompanhamento', 'description' => 'Publicação, treinamento e arquivos organizados. Seguimos por perto para ajustes e evolução.', 'order' => 6],
        ] as $step) {
            ProcessStep::query()->create($step);
        }

        foreach ([
            ['name' => 'Marina Rego', 'role' => 'Direção de criação', 'bio' => 'Conduz a estratégia de marca e garante que cada decisão visual tenha um porquê.', 'order' => 1],
            ['name' => 'Caio Tavares', 'role' => 'Design e interface', 'bio' => 'Desenha telas e sistemas que continuam fazendo sentido depois do lançamento.', 'order' => 2],
            ['name' => 'Bruna Salles', 'role' => 'Desenvolvimento', 'bio' => 'Transforma design em site rápido, acessível e fácil de manter.', 'order' => 3],
            ['name' => 'Diego Nunes', 'role' => 'Conteúdo e estratégia', 'bio' => 'Escreve o que a marca precisa dizer para ser escolhida.', 'order' => 4],
        ] as $member) {
            TeamMember::query()->create($member);
        }

        foreach (config('site_settings.groups') as $groupKey => $group) {
            foreach ($group['fields'] as $field) {
                if ($field['default'] !== null) {
                    Settings::set($field['key'], $field['default'], $groupKey, $field['type']);
                }
            }
        }
    }
}
