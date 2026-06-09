import type { FoodEntry } from "../store/useStore";

export interface Totals { kcal: number; p: number; c: number; f: number; }

export function sumEntries(entries: FoodEntry[] = []): Totals {
  return entries.reduce(
    (acc, e) => ({ kcal: acc.kcal + e.kcal, p: acc.p + e.p, c: acc.c + e.c, f: acc.f + e.f }),
    { kcal: 0, p: 0, c: 0, f: 0 }
  );
}

// Calcula macros para una porción de "grams" g a partir de valores por 100 g.
export function scale(per100: { kcal: number; p: number; c: number; f: number }, grams: number) {
  const k = grams / 100;
  return {
    kcal: Math.round(per100.kcal * k),
    p: Math.round(per100.p * k * 10) / 10,
    c: Math.round(per100.c * k * 10) / 10,
    f: Math.round(per100.f * k * 10) / 10,
  };
}
