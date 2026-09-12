import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { CtaFinal, Section } from "@/components/site/Blocos";
import { projetos } from "@/lib/site-data";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const projeto = projetos.find((p) => p.slug === params.slug);
    if (!projeto) throw notFound();
    return { projeto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Projeto não encontrado — Regato" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { projeto } = loaderData;
    const titulo = `${projeto.nome} — Portfólio Regato`;
    return {
      meta: [
        { title: titulo },
        { name: "description", content: projeto.resumo },
        { property: "og:title", content: titulo },
        { property: "og:description", content: projeto.resumo },
      ],
    };
  },
  notFoundComponent: ProjetoNaoEncontrado,
  component: ProjetoPage,
});

function ProjetoNaoEncontrado() {
  return (
    <Section>
      <h1 className="text-3xl font-bold">Projeto não encontrado</h1>
      <p className="mt-3 text-muted-foreground">
        Este projeto pode ter saído do ar.
      </p>
      <Link to="/portfolio" className="mt-6 inline-block text-olive">
        Voltar ao portfólio
      </Link>
    </Section>
  );
}

function ProjetoPage() {
  const { projeto } = Route.useLoaderData();

  return (
    <>
      <Section>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Portfólio
        </Link>
        <p className="eyebrow mt-8">
          {projeto.categoria} · {projeto.ano}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold sm:text-5xl">
          {projeto.nome}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {projeto.resumo}
        </p>
        <img
          src={projeto.imagem}
          alt={`Capa do projeto ${projeto.nome}`}
          className="mt-12 aspect-16/9 w-full rounded-3xl object-cover"
        />
      </Section>

      <Section cream>
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { t: "Desafio", c: projeto.desafio },
            { t: "Solução", c: projeto.solucao },
            { t: "Resultado", c: projeto.resultado },
          ].map((b) => (
            <div key={b.t}>
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                {b.t}
              </h2>
              <p className="mt-4 text-base opacity-80">{b.c}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-cream-foreground/15 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider">
            Entregas
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {projeto.entregas.map((e) => (
              <li key={e} className="flex gap-2 text-sm opacity-85">
                <Check className="mt-0.5 h-4 w-4 shrink-0" /> {e}
              </li>
            ))}
          </ul>
        </div>
        {projeto.depoimento && (
          <figure className="mt-14 max-w-3xl border-l-2 border-cream-foreground/25 pl-6">
            <blockquote className="text-xl leading-relaxed">
              “{projeto.depoimento.texto}”
            </blockquote>
            <figcaption className="mt-4 text-sm opacity-70">
              {projeto.depoimento.autor}
            </figcaption>
          </figure>
        )}
      </Section>

      <CtaFinal />
    </>
  );
}
