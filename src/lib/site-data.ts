import projeto1 from "@/assets/projeto-1.jpg";
import projeto2 from "@/assets/projeto-2.jpg";
import projeto3 from "@/assets/textura-musgo.jpg";

/**
 * CONTEÚDO FICTÍCIO — substituir pelos dados reais do estúdio.
 */
export const empresa = {
  nome: "Regato",
  slogan: "Ideias que ganham movimento",
  descricao:
    "Estúdio de criação de sites, identidade visual e design digital. Marcas que traduzem o que você é.",
  email: "contato@regato.studio",
  telefone: "+55 (11) 98888-1234",
  whatsapp: "5511988881234",
  cidade: "São Paulo, SP — atendimento em todo o Brasil",
  instagram: "@regatoestudio",
  instagramUrl: "https://instagram.com/regatoestudio",
  linkedinUrl: "https://linkedin.com/company/regatoestudio",
  behanceUrl: "https://behance.net/regatoestudio",
  horario: "Segunda a sexta, das 9h às 18h",
};

export const navegacao = [
  { to: "/", label: "Início" },
  { to: "/servicos", label: "Serviços" },
  { to: "/portfolio", label: "Portfólio" },
  { to: "/planos", label: "Planos" },
  { to: "/processo", label: "Processo" },
  { to: "/sobre", label: "Sobre" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
] as const;

export type Servico = {
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  paraQuem: string;
  entregas: string[];
  prazo: string;
};

export const servicos: Servico[] = [
  {
    slug: "criacao-de-sites",
    titulo: "Criação de Sites",
    resumo: "Sites modernos, rápidos e personalizados, feitos para converter.",
    descricao:
      "Do institucional ao catálogo digital, desenhamos e desenvolvemos sites sob medida, com foco em performance, conteúdo claro e uma jornada que leva o visitante até o contato.",
    paraQuem:
      "Negócios que precisam de presença digital própria, com identidade e velocidade.",
    entregas: [
      "Arquitetura de páginas e conteúdo",
      "Design exclusivo, sem template pronto",
      "Site responsivo para celular, tablet e desktop",
      "Otimização técnica para buscadores",
      "Formulários e integrações de contato",
      "Treinamento de uso e 30 dias de suporte",
    ],
    prazo: "De 3 a 6 semanas",
  },
  {
    slug: "identidade-visual",
    titulo: "Identidade Visual",
    resumo: "Marcas com propósito, coerentes em todos os pontos de contato.",
    descricao:
      "Construímos a identidade a partir da estratégia: quem é a marca, para quem fala e o que precisa provocar. O resultado é um sistema visual completo e um manual para aplicar sem dúvidas.",
    paraQuem:
      "Marcas novas ou negócios que cresceram e precisam de uma imagem à altura.",
    entregas: [
      "Imersão e posicionamento",
      "Logotipo principal, secundário e versões monocromáticas",
      "Paleta de cores e tipografia",
      "Sistema gráfico e padrões de aplicação",
      "Papelaria e modelos para redes sociais",
      "Manual de marca em PDF",
    ],
    prazo: "De 4 a 8 semanas",
  },
  {
    slug: "design-digital",
    titulo: "Design Digital",
    resumo: "Experiências que conectam pessoas e ideias no dia a dia.",
    descricao:
      "Interfaces de produto, campanhas, materiais para redes e apresentações. Design que mantém a marca viva depois do lançamento.",
    paraQuem:
      "Times que já têm marca e precisam de consistência e ritmo de produção.",
    entregas: [
      "Interfaces de produto e painéis",
      "Design system e biblioteca de componentes",
      "Peças para redes sociais e campanhas",
      "Apresentações e materiais comerciais",
      "Landing pages de campanha",
      "Acompanhamento mensal opcional",
    ],
    prazo: "De 2 a 4 semanas por ciclo",
  },
];

export type Projeto = {
  slug: string;
  nome: string;
  categoria: "Identidade Visual" | "Criação de Sites" | "Design Digital";
  ano: string;
  resumo: string;
  imagem: string;
  desafio: string;
  solucao: string;
  resultado: string;
  entregas: string[];
  depoimento?: { texto: string; autor: string };
};

export const projetos: Projeto[] = [
  {
    slug: "vale-verde-cafe",
    nome: "Vale Verde Café",
    categoria: "Identidade Visual",
    ano: "2025",
    resumo:
      "Identidade completa para um torrefador de café de montanha, do símbolo à embalagem.",
    imagem: projeto1,
    desafio:
      "O café era vendido a granel e não tinha nome nas prateleiras. Faltava uma imagem que sustentasse o preço justo do produto.",
    solucao:
      "Criamos um sistema visual inspirado nas curvas de nível da serra, com papelaria e embalagens que contam a origem de cada lote.",
    resultado:
      "Entrada em 12 cafeterias no primeiro semestre e aumento de 38% no preço médio por quilo.",
    entregas: [
      "Naming e logotipo",
      "Sistema gráfico e embalagens",
      "Papelaria completa",
      "Manual de marca",
    ],
    depoimento: {
      texto:
        "A marca finalmente parece com o café que a gente faz. Mudou a conversa com os compradores.",
      autor: "Helena Braz, sócia do Vale Verde Café",
    },
  },
  {
    slug: "corrente-arquitetura",
    nome: "Corrente Arquitetura",
    categoria: "Criação de Sites",
    ano: "2025",
    resumo:
      "Site-portfólio para um escritório de arquitetura residencial, com foco em captação de projetos.",
    imagem: projeto2,
    desafio:
      "O escritório dependia de indicação e não tinha onde mostrar os projetos concluídos.",
    solucao:
      "Um site enxuto, com páginas de projeto em formato de história e um caminho curto até o formulário de orçamento.",
    resultado:
      "22 pedidos de orçamento qualificados nos primeiros três meses no ar.",
    entregas: [
      "Arquitetura de conteúdo",
      "Design e desenvolvimento",
      "Páginas de projeto",
      "Otimização para buscadores",
    ],
    depoimento: {
      texto:
        "Pela primeira vez o cliente chega sabendo o que fazemos e quanto custa. O time economiza horas por semana.",
      autor: "Rafael Pinho, sócio da Corrente Arquitetura",
    },
  },
  {
    slug: "musgo-botanica",
    nome: "Musgo Botânica",
    categoria: "Design Digital",
    ano: "2024",
    resumo:
      "Sistema de peças e loja digital para uma marca de plantas raras.",
    imagem: projeto3,
    desafio:
      "A marca postava todo dia, mas cada peça parecia de uma empresa diferente.",
    solucao:
      "Criamos um design system leve, com modelos editáveis para redes, e-mail e campanhas sazonais.",
    resultado:
      "Produção de conteúdo três vezes mais rápida e crescimento de 61% no engajamento.",
    entregas: [
      "Design system",
      "Modelos para redes sociais",
      "Landing pages de campanha",
      "Guia de uso para o time interno",
    ],
  },
  {
    slug: "pedra-lisa-turismo",
    nome: "Pedra Lisa Turismo",
    categoria: "Criação de Sites",
    ano: "2024",
    resumo:
      "Site de experiências de trilha e cachoeira, com roteiros e reservas por WhatsApp.",
    imagem: projeto2,
    desafio:
      "Roteiros eram explicados um a um no WhatsApp, o que travava a operação nos fins de semana.",
    solucao:
      "Páginas por roteiro, com nível de dificuldade, o que está incluso e valores visíveis antes do contato.",
    resultado:
      "Redução de 45% no tempo de atendimento por reserva.",
    entregas: [
      "Design e desenvolvimento",
      "Páginas de roteiro",
      "Integração com WhatsApp",
    ],
  },
  {
    slug: "raiz-consultoria",
    nome: "Raiz Consultoria",
    categoria: "Identidade Visual",
    ano: "2024",
    resumo: "Reposicionamento e nova identidade para consultoria agroflorestal.",
    imagem: projeto1,
    desafio:
      "A consultoria era vista como acadêmica demais por produtores rurais.",
    solucao:
      "Nova linguagem visual e verbal, mais direta e próxima do campo, mantendo a autoridade técnica.",
    resultado:
      "Ciclo de vendas 20% mais curto e três contratos de longo prazo fechados.",
    entregas: [
      "Posicionamento",
      "Identidade visual",
      "Apresentação comercial",
      "Manual de marca",
    ],
  },
  {
    slug: "correnteza-app",
    nome: "Correnteza App",
    categoria: "Design Digital",
    ano: "2023",
    resumo: "Interface de um aplicativo de monitoramento de rios urbanos.",
    imagem: projeto3,
    desafio:
      "Dados técnicos de qualidade da água precisavam ser lidos por qualquer pessoa da comunidade.",
    solucao:
      "Painéis simples, com cores de estado e leitura em uma tela, mais um design system para escalar telas novas.",
    resultado:
      "Nota 4,8 de facilidade de uso nos testes com moradores.",
    entregas: ["Pesquisa com usuários", "Protótipo", "Design system", "Telas finais"],
  },
];

export const categoriasProjeto = [
  "Todos",
  "Criação de Sites",
  "Identidade Visual",
  "Design Digital",
] as const;

export type Plano = {
  nome: string;
  preco: string;
  periodo: string;
  resumo: string;
  destaque?: boolean;
  itens: string[];
  ideal: string;
};

export const planos: Plano[] = [
  {
    nome: "Essencial",
    preco: "R$ 4.900",
    periodo: "projeto único",
    resumo: "Uma presença digital bem feita para começar.",
    ideal: "Profissionais autônomos e negócios em início de operação.",
    itens: [
      "Site de até 4 páginas",
      "Design exclusivo e responsivo",
      "Formulário de contato e WhatsApp",
      "Otimização básica para buscadores",
      "1 rodada de ajustes",
      "30 dias de suporte",
    ],
  },
  {
    nome: "Movimento",
    preco: "R$ 11.800",
    periodo: "projeto único",
    resumo: "Marca e site nascendo juntos, com a mesma voz.",
    destaque: true,
    ideal: "Negócios que estão se posicionando ou fazendo a virada de marca.",
    itens: [
      "Identidade visual completa com manual",
      "Site de até 8 páginas",
      "Sistema gráfico e modelos para redes",
      "Textos revisados junto com você",
      "2 rodadas de ajustes",
      "90 dias de suporte",
    ],
  },
  {
    nome: "Presença",
    preco: "R$ 3.200",
    periodo: "por mês",
    resumo: "O estúdio junto do seu time, todo mês.",
    ideal: "Marcas que produzem conteúdo e campanhas de forma contínua.",
    itens: [
      "Horas mensais de design dedicadas",
      "Peças para redes e campanhas",
      "Landing pages sob demanda",
      "Evolução do site e da marca",
      "Reunião quinzenal de prioridades",
      "Prazo de resposta em até 1 dia útil",
    ],
  },
];

export const etapasProcesso = [
  {
    numero: "01",
    titulo: "Conversa inicial",
    duracao: "1 semana",
    texto:
      "Entendemos o negócio, os objetivos e o momento. Saímos daqui com escopo, prazo e investimento definidos.",
  },
  {
    numero: "02",
    titulo: "Imersão e estratégia",
    duracao: "1 a 2 semanas",
    texto:
      "Pesquisa de mercado, conversa com o público e definição de posicionamento. É o que dá direção a todas as decisões visuais.",
  },
  {
    numero: "03",
    titulo: "Conceito",
    duracao: "1 semana",
    texto:
      "Apresentamos o caminho criativo com justificativa. Você escolhe a direção antes de qualquer arte final.",
  },
  {
    numero: "04",
    titulo: "Design",
    duracao: "2 a 3 semanas",
    texto:
      "Marca, telas e peças ganham forma. Você acompanha em entregas parciais, sem surpresa no final.",
  },
  {
    numero: "05",
    titulo: "Desenvolvimento",
    duracao: "1 a 3 semanas",
    texto:
      "Construção do site com foco em velocidade, acessibilidade e busca. Testes em celular, tablet e desktop.",
  },
  {
    numero: "06",
    titulo: "Entrega e acompanhamento",
    duracao: "contínuo",
    texto:
      "Publicação, treinamento e arquivos organizados. Depois, seguimos por perto para ajustes e evolução.",
  },
];

export const depoimentos = [
  {
    texto:
      "O processo é claro do início ao fim. Em nenhum momento ficamos no escuro sobre o que vinha a seguir.",
    autor: "Helena Braz",
    cargo: "Sócia, Vale Verde Café",
  },
  {
    texto:
      "Entregaram mais do que um site: entregaram uma forma de explicar o nosso trabalho.",
    autor: "Rafael Pinho",
    cargo: "Sócio, Corrente Arquitetura",
  },
  {
    texto:
      "A equipe entendeu o campo e traduziu isso em uma marca que o produtor respeita.",
    autor: "Amanda Ferraz",
    cargo: "Diretora, Raiz Consultoria",
  },
];

export const numeros = [
  { valor: "9 anos", rotulo: "de estúdio" },
  { valor: "140+", rotulo: "projetos entregues" },
  { valor: "96%", rotulo: "de clientes que voltam" },
  { valor: "4 sem.", rotulo: "prazo médio de site" },
];

export const equipe = [
  {
    nome: "Marina Rego",
    cargo: "Direção de criação",
    bio: "Conduz a estratégia de marca e garante que cada decisão visual tenha um porquê.",
    iniciais: "MR",
  },
  {
    nome: "Caio Tavares",
    cargo: "Design e interface",
    bio: "Desenha telas e sistemas que continuam fazendo sentido depois do lançamento.",
    iniciais: "CT",
  },
  {
    nome: "Bruna Salles",
    cargo: "Desenvolvimento",
    bio: "Transforma design em site rápido, acessível e fácil de manter.",
    iniciais: "BS",
  },
  {
    nome: "Diego Nunes",
    cargo: "Conteúdo e estratégia",
    bio: "Escreve o que a marca precisa dizer para ser escolhida.",
    iniciais: "DN",
  },
];

export const valores = [
  {
    titulo: "Processo à vista",
    texto:
      "Você acompanha cada etapa. Nada de sumir por semanas e aparecer com uma arte pronta.",
  },
  {
    titulo: "Decisão com motivo",
    texto:
      "Cor, tipo e layout têm justificativa ligada ao negócio, não a gosto pessoal.",
  },
  {
    titulo: "Feito para durar",
    texto:
      "Entregamos sistemas que o seu time consegue aplicar sozinho depois.",
  },
  {
    titulo: "Prazo é combinado",
    texto: "Cronograma acordado no início e revisado toda semana com você.",
  },
];

export const perguntas = [
  {
    pergunta: "Quanto custa um projeto com a Regato?",
    resposta:
      "Sites a partir de R$ 4.900 e identidade visual completa a partir de R$ 7.500. O valor final depende do número de páginas, do nível de pesquisa e das aplicações necessárias. Na página de Planos você encontra os pacotes fechados.",
  },
  {
    pergunta: "Qual é o prazo médio de entrega?",
    resposta:
      "Um site institucional leva de 3 a 6 semanas. Uma identidade visual completa leva de 4 a 8 semanas. Projetos que unem marca e site costumam levar de 8 a 10 semanas.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta:
      "Normalmente 40% na assinatura da proposta e 60% na entrega final, com possibilidade de parcelamento em até 4 vezes. Contratos mensais são cobrados no início de cada ciclo.",
  },
  {
    pergunta: "Vocês escrevem os textos do site?",
    resposta:
      "Sim. Trabalhamos os textos junto com você em uma sessão de conteúdo e entregamos tudo revisado. Se preferir usar o seu material, fazemos a adaptação.",
  },
  {
    pergunta: "Quem fica com os arquivos no final?",
    resposta:
      "Você. Entregamos os arquivos editáveis, o manual de marca e todos os acessos do site em seu nome.",
  },
  {
    pergunta: "Vocês fazem manutenção depois da entrega?",
    resposta:
      "Sim. Todo projeto inclui um período de suporte e você pode seguir com o plano Presença para evolução contínua.",
  },
  {
    pergunta: "Atendem fora de São Paulo?",
    resposta:
      "Atendemos todo o Brasil. Todo o processo funciona por videochamada, com reuniões marcadas com antecedência.",
  },
  {
    pergunta: "Quantas rodadas de ajuste estão incluídas?",
    resposta:
      "Duas rodadas na maioria dos projetos, sempre dentro da direção aprovada no conceito. Ajustes extras são orçados à parte.",
  },
];

export const tiposProjeto = [
  "Criação de site",
  "Identidade visual",
  "Marca e site juntos",
  "Design digital contínuo",
  "Ainda não sei",
];

export const faixasInvestimento = [
  "Até R$ 5.000",
  "R$ 5.000 a R$ 12.000",
  "R$ 12.000 a R$ 25.000",
  "Acima de R$ 25.000",
  "Prefiro conversar antes",
];
