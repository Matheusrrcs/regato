type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

/** Símbolo Regato: círculo com a curva do "r" em movimento. */
export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        fill="none"
      >
        <circle cx="24" cy="24" r="22" fill="currentColor" />
        <path
          d="M19 34V19.5c0-3.6 2.9-6.5 6.5-6.5H30"
          stroke="var(--background)"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        <path
          d="M30 13v6"
          stroke="var(--background)"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-2xl font-bold lowercase tracking-tight">
          regato
        </span>
      )}
    </span>
  );
}
