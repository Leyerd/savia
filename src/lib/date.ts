// Utilidades de fecha (clave YYYY-MM-DD en hora local).
export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function prettyDate(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-CL", { weekday: "long", day: "numeric", month: "long" });
}

export function todayWeekdayKey(): string {
  const map = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  return map[new Date().getDay()];
}

export function lastNDays(n: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    out.push(dateKey(d));
  }
  return out;
}
