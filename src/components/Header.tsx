import { type ReactNode } from "react";

// Logo oficial de Savia: hoja (nutrición) + línea de pulso (actividad).
export function SaviaMark({ size = 42 }: { size?: number }) {
  return (
    <div className="brand-badge" style={{ width: size, height: size }}>
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 100 100" aria-hidden="true">
        <path d="M50 14 C76 30 76 70 50 86 C24 70 24 30 50 14 Z" fill="#F6F4ED" />
        <path d="M28 50 L43 50 L48 38 L52 64 L57 50 L72 50" fill="none" stroke="#FF6A3D"
          strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Header({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <header className="header">
      <div className="row">
        <SaviaMark />
        <div>
          <h1>{title}</h1>
          {sub && <div className="sub">{sub}</div>}
        </div>
      </div>
      {right}
    </header>
  );
}
