import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navegacao } from "@/lib/site-data";

export function Header() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="text-foreground" aria-label="Regato, página inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {navegacao.slice(1, -1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contato"
            className="rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-cream-foreground transition-opacity hover:opacity-90"
          >
            Começar um projeto
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="lg:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {aberto && (
        <nav
          className="border-t border-border/60 bg-background px-5 pb-6 lg:hidden"
          aria-label="Menu móvel"
        >
          {navegacao.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setAberto(false)}
              className="block border-b border-border/40 py-3.5 text-base text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
