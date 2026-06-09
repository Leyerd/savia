// Anillo de calorías con SVG.
export function MacroRing({
  value, max, label = "kcal",
}: { value: number; max: number; label?: string }) {
  const size = 150, stroke = 13, r = (size - stroke) / 2, c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const over = value > max;
  const color = over ? "var(--red)" : pct > 0.85 ? "var(--peach)" : "var(--green)";
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface0)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset .5s ease, stroke .3s" }}
        />
      </svg>
      <div className="ring-center">
        <div className="big">{Math.round(value)}</div>
        <div className="small">/ {max} {label}</div>
      </div>
    </div>
  );
}

export function MacroBar({
  label, value, target, color,
}: { label: string; value: number; target: number; color: string }) {
  const pct = target > 0 ? Math.min((value / target) * 100, 100) : 0;
  const over = value > target;
  return (
    <div style={{ marginTop: 10 }}>
      <div className="row between tiny" style={{ marginBottom: 4 }}>
        <span className="muted">{label}</span>
        <span style={{ color: over ? "var(--red)" : "var(--text)" }}>
          {Math.round(value)} / {target} g
        </span>
      </div>
      <div className="bar">
        <span style={{ width: `${pct}%`, background: over ? "var(--red)" : color }} />
      </div>
    </div>
  );
}
