import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import heroImg from "@/assets/hero-natureza.jpg";
import { Curves } from "@/components/site/Curves";
import { CtaFinal, Section, SectionTitle } from "@/components/site/Blocos";
import {
  depoimentos,
  empresa,
  numeros,
  projetos,
  servicos,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Regato — Criação de sites e identidade visual" },
      {
        name: "description",
        content:
          "Estúdio de criação de sites, identidade visual e design digital. Marcas com propósito e sites feitos para converter.",
      },
      {
        property: "og:title",
        content: "Regato — Criação de sites e identidade visual",
      },
      {
        property: "og:description",
        content:
          "Estúdio de criação de sites, identidade visual e design digital. Ideias que ganham movimento.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Curves className="absolute -left-40 -top-40 h-[700px] w-[700px] text-olive/10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="eyebrow rise-in">Estúdio de criação · desde 2017</p>
            <h1 className="rise-in mt-5 text-4xl font-bold leading-[1.02] sm:text-6xl">
              {empresa.slogan}
            </h1>
            <p className="rise-in mt-6 max-w-xl text-lg text-muted-foreground">
              Criamos sites, marcas e sistemas visuais que traduzem o que o seu
              negócio é — com processo claro, prazo combinado e decisões que têm
              motivo.
            </p>
            <div className="rise-in mt-9 flex flex-wrap gap-3">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-cream-foreground transition-opacity hover:opacity-90"
              >
                Começar um projeto <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                Ver portfólio
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="Riacho correndo entre pedras cobertas de musgo em floresta"
              width={1600}
              height={1100}
              className="aspect-4/3 w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <Section cream>
        <SectionTitle
          eyebrow="O que fazemos"
          titulo="Três frentes, uma mesma direção"
          descricao="Marca, site e design do dia a dia — separados ou juntos, sempre com a mesma coerência."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {servicos.map((s) => (
            <Link
              key={s.slug}
              to="/servicos"
              className="group rounded-2xl border border-cream-foreground/12 p-8 transition-colors hover:bg-cream-foreground/5"
            >
              <h3 className="text-xl font-semibold">{s.titulo}</h3>
              <p className="mt-3 text-sm opacity-75">{s.resumo}</p>
              <ul className="mt-6 space-y-2">
                {s.entregas.slice(0, 3).map((e) => (
                  <li key={e} className="flex gap-2 text-sm opacity-80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" /> {e}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Saber mais{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="Portfólio"
            titulo="Projetos recentes"
            descricao="Uma amostra do que entregamos nos últimos anos."
          />
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-olive"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {projetos.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to="/portfolio/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={p.imagem}
                alt={`Projeto ${p.nome}`}
                loading="lazy"
                className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <p className="eyebrow">{p.categoria}</p>
                <h3 className="mt-2 text-lg font-semibold">{p.nome}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.resumo}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section cream className="border-y border-border/40">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <p className="font-display text-4xl font-bold">{n.valor}</p>
              <p className="mt-2 text-sm opacity-70">{n.rotulo}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Clientes" titulo="O que dizem sobre o estúdio" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {depoimentos.map((d) => (
            <figure
              key={d.autor}
              className="rounded-2xl border border-border p-8"
            >
              <blockquote className="text-base leading-relaxed">
                “{d.texto}”
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{d.autor}</span>
                <br />
                {d.cargo}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
