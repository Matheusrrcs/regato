import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Curves } from "./Curves";

export function PageHeader({
  eyebrow,
  titulo,
  descricao,
}: {
  eyebrow: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <Curves className="absolute -left-32 -top-56 h-[620px] w-[620px] text-olive/10" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="eyebrow rise-in">{eyebrow}</p>
        <h1 className="rise-in mt-4 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          {titulo}
        </h1>
        <p className="rise-in mt-6 max-w-2xl text-lg text-muted-foreground">
          {descricao}
        </p>
      </div>
    </section>
  );
}

export function Section({
  children,
  className = "",
  cream = false,
}: {
  children: ReactNode;
  className?: string;
  cream?: boolean;
}) {
  return (
    <section className={`${cream ? "surface-cream" : ""} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  titulo,
  descricao,
  dark = false,
}: {
  eyebrow: string;
  titulo: string;
  descricao?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={dark ? "eyebrow" : "eyebrow"}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">{titulo}</h2>
      {descricao && (
        <p
          className={`mt-4 text-base ${dark ? "opacity-70" : "text-muted-foreground"}`}
        >
          {descricao}
        </p>
      )}
    </div>
  );
}

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      <Curves className="absolute -right-24 -bottom-64 h-[600px] w-[600px] text-olive/10" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
            Vamos colocar a sua ideia em movimento?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Conte o que você precisa. Respondemos em até 1 dia útil com os próximos
            passos, prazo e faixa de investimento.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-cream-foreground transition-opacity hover:opacity-90"
            >
              Começar um projeto <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/planos"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Ver planos e preços
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
