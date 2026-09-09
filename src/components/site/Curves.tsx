/** Elemento gráfico da marca: curvas concêntricas do símbolo. */
export function Curves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
    >
      {[120, 190, 260, 330, 400].map((r, i) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          stroke="currentColor"
          strokeWidth={i % 2 === 0 ? 26 : 12}
          strokeDasharray={`${r * 2.4} ${r * 6}`}
          strokeLinecap="round"
          transform={`rotate(${-35 + i * 12} 300 300)`}
          opacity={0.55 - i * 0.07}
        />
      ))}
    </svg>
  );
}
