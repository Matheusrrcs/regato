import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { Curves } from "./Curves";
import { empresa, servicos } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-background">
      <Curves className="absolute -right-40 -top-40 h-[520px] w-[520px] text-olive/10" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo className="text-foreground" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {empresa.descricao}
            </p>
            <p className="eyebrow mt-6">Ideias · Movimento · Presença</p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold">Serviços</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link to="/servicos" hash={s.slug} className="hover:text-foreground">
                    {s.titulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/planos" className="hover:text-foreground">
                  Planos e preços
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold">Estúdio</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/sobre" className="hover:text-foreground">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/processo" className="hover:text-foreground">
                  Processo
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-foreground">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-foreground">
                  Perguntas frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold">Contato</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <a href={`mailto:${empresa.email}`} className="hover:text-foreground">
                  {empresa.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <a
                  href={`https://wa.me/${empresa.whatsapp}`}
                  className="hover:text-foreground"
                >
                  {empresa.telefone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                <span>{empresa.cidade}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-4 text-sm text-muted-foreground">
              <a href={empresa.instagramUrl} className="hover:text-foreground">
                Instagram
              </a>
              <a href={empresa.linkedinUrl} className="hover:text-foreground">
                LinkedIn
              </a>
              <a href={empresa.behanceUrl} className="hover:text-foreground">
                Behance
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link to="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="hover:text-foreground">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
