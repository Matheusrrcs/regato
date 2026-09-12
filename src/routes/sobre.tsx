import { createFileRoute } from "@tanstack/react-router";
import { CtaFinal, PageHeader, Section, SectionTitle } from "@/components/site/Blocos";
import { equipe, numeros, valores } from "@/lib/site-data";
import musgo from "@/assets/textura-musgo.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o estúdio — Regato" },
      {
        name: "description",
        content:
          "Quem somos, como trabalhamos e no que acreditamos: a história e a equipe por trás do estúdio Regato.",
      },
      { property: "og:title", content: "Sobre o estúdio — Regato" },
      {
        property: "og:description",
        content:
          "Nove anos criando marcas e sites com processo à vista e decisões com motivo.",
      },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre"
        titulo="Um estúdio pequeno, feito de gente que assina o que entrega"
        descricao="Nascemos em 2017 com uma ideia simples: design é decisão de negócio, não enfeite."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-base text-muted-foreground">
            <p>
              A Regato começou numa sala emprestada, com dois projetos e muita
              teimosia. Hoje somos um time de quatro pessoas que atende marcas de
              todo o Brasil, sempre em poucos projetos ao mesmo tempo.
            </p>
            <p>
              Trabalhamos em ciclos curtos, com entregas parciais e conversas
              francas. Nada de sumir por semanas e voltar com uma arte pronta
              para ser aprovada às cegas.
            </p>
            <p>
              O nome vem do riacho: pequeno, constante e capaz de mudar a
              paisagem com o tempo. É assim que enxergamos o trabalho de marca.
            </p>
          </div>
          <img
            src={musgo}
            alt="Textura de musgo e pedra, referência visual da marca"
            loading="lazy"
            className="aspect-4/3 w-full rounded-3xl object-cover"
          />
        </div>
      </Section>

      <Section cream>
        <SectionTitle
          eyebrow="Valores"
          titulo="Como trabalhamos"
          descricao="Quatro combinados que valem para todo projeto."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {valores.map((v) => (
            <div
              key={v.titulo}
              className="rounded-2xl border border-cream-foreground/12 p-8"
            >
              <h3 className="text-lg font-semibold">{v.titulo}</h3>
              <p className="mt-3 text-sm opacity-75">{v.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Equipe" titulo="Quem faz" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipe.map((p) => (
            <div key={p.nome} className="rounded-2xl border border-border p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary font-display text-lg font-semibold">
                {p.iniciais}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{p.nome}</h3>
              <p className="eyebrow mt-1">{p.cargo}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section cream>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <p className="font-display text-4xl font-bold">{n.valor}</p>
              <p className="mt-2 text-sm opacity-70">{n.rotulo}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaFinal />
    </>
  );
}
