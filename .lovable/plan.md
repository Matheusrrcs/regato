# Site completo — Regato (estúdio de criação de sites e identidade visual)

Site institucional completo, seguindo o manual de marca enviado: verde floresta profundo, verde musgo, oliva como acento, off-white para textos e fundos claros. Títulos em Montserrat, textos em Inter. Curvas do símbolo usadas como elemento gráfico de fundo, fotografia de natureza (água, musgo, pedras) como atmosfera.

## Páginas

1. **Início** — abertura com "Ideias que ganham movimento", resumo dos serviços, prévia de projetos, números, depoimento em destaque e chamada para contato.
2. **Serviços** — Criação de Sites, Identidade Visual, Design Digital: o que inclui, para quem é, entregas e prazos.
3. **Portfólio** — grade de projetos com filtro por tipo; cada projeto abre uma página própria com desafio, solução e resultado.
4. **Planos e preços** — três pacotes (Essencial, Movimento, Presença) com o que entra em cada um, mais uma faixa "projeto sob medida".
5. **Processo** — as etapas do trabalho, do briefing à entrega, em linha do tempo.
6. **Sobre** — história, jeito de trabalhar, valores e equipe.
7. **FAQ** — perguntas frequentes em sanfona.
8. **Contato** — formulário completo (nome, e-mail, telefone/WhatsApp, empresa, tipo de projeto, faixa de investimento, mensagem), dados de contato e redes.

Também: cabeçalho fixo com menu (e menu para celular), rodapé completo, página de erro 404 e páginas de Política de Privacidade e Termos.

## Formulário de contato

Ativo o Lovable Cloud e guardo cada mensagem enviada. Depois de enviar, a pessoa vê uma confirmação na tela. As mensagens ficam protegidas: só quem tem acesso administrativo consegue ler.

## Conteúdo

Todo o conteúdo (textos, projetos, depoimentos, preços, e-mail, telefone e cidade) será fictício e coerente com a marca — deixo tudo marcado numa lista para você substituir pelos dados reais depois. As fotos de natureza e as capas dos projetos serão geradas no estilo do manual.

## Detalhes técnicos

- Rotas TanStack: `/`, `/servicos`, `/portfolio`, `/portfolio/$slug`, `/planos`, `/processo`, `/sobre`, `/faq`, `/contato`, `/privacidade`, `/termos`.
- Tokens de cor/tipografia em `src/styles.css` (oklch); fontes Montserrat + Inter carregadas por `<link>` em `__root.tsx`.
- Cabeçalho/rodapé em `__root.tsx`; componentes reutilizáveis em `src/components/`.
- Lovable Cloud: tabela `contact_messages` com RLS (insert público, leitura só para admin via tabela `user_roles` + `has_role`) e GRANTs; envio via `createServerFn`, validação com Zod.
- SEO por página: title, description, og/twitter próprios; H1 único; imagens com alt; robots.txt.
- Responsivo, com animações discretas de entrada e curvas em SVG.
