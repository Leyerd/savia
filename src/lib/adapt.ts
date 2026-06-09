// Recalibración DINÁMICA del gasto energético (TDEE) a partir de datos reales.
//
// BASE CIENTÍFICA — balance energético:
//   Si registras lo que comes y tu peso, tu gasto real se deduce de:
//       TDEE_real = ingesta_media_diaria − (Δpeso_kg × 7700 / días)
//   donde 7700 kcal ≈ energía de 1 kg de tejido corporal (mezcla grasa/músculo).
//   Es el mismo principio que usan apps como MacroFactor: en vez de confiar
//   solo en una fórmula (Mifflin-St Jeor), se mide cómo responde TU cuerpo.
//
// Requisitos para una estimación fiable: una ventana de al menos ~10-14 días,
// dos pesajes que la abarquen y registro de comida en la mayoría de los días.
// Si no hay datos suficientes, devuelve null y la app usa la fórmula teórica.

import type { FoodEntry, WeightEntry } from "../store/useStore";
import { sumEntries } from "./totals";

export interface MeasuredTDEE {
  tdee: number;          // gasto real estimado (kcal/día)
  meanIntake: number;    // ingesta media diaria en la ventana (kcal)
  weightChangeKg: number; // cambio de peso en la ventana
  spanDays: number;      // días entre el primer y último pesaje usados
  loggedDays: number;    // días con comida registrada en la ventana
  coverage: number;      // loggedDays / spanDays (0..1)
  confidence: "alta" | "media" | "baja";
}

const KCAL_PER_KG = 7700;

function diffDays(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round((db - da) / 86400000);
}

/**
 * Estima el TDEE real con los datos de los últimos `windowDays` días.
 * Devuelve null si no hay datos suficientes para ser fiable.
 */
export function measuredTdee(
  diary: Record<string, FoodEntry[]>,
  weights: WeightEntry[],
  windowDays = 21
): MeasuredTDEE | null {
  if (weights.length < 2) return null;

  // Pesajes dentro de la ventana (los más recientes).
  const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const last = sorted[sorted.length - 1];
  const inWindow = sorted.filter((w) => diffDays(w.date, last.date) <= windowDays);
  if (inWindow.length < 2) return null;

  const first = inWindow[0];
  const spanDays = diffDays(first.date, last.date);
  if (spanDays < 7) return null; // muy poco tiempo: ruido del agua/intestino

  // Ingesta de los días con registro real dentro del rango [first, last].
  let totalKcal = 0;
  let loggedDays = 0;
  for (const dateStr in diary) {
    if (diffDays(first.date, dateStr) < 0 || diffDays(dateStr, last.date) < 0) continue;
    const kcal = sumEntries(diary[dateStr]).kcal;
    if (kcal > 300) { totalKcal += kcal; loggedDays++; } // ignora días casi vacíos
  }
  if (loggedDays < 7) return null;

  const coverage = Math.min(1, loggedDays / spanDays);
  if (coverage < 0.5) return null; // demasiados huecos: poco fiable

  const meanIntake = totalKcal / loggedDays;
  const weightChangeKg = last.kg - first.kg;
  let tdee = meanIntake - (weightChangeKg * KCAL_PER_KG) / spanDays;
  tdee = Math.max(1000, Math.min(5000, Math.round(tdee)));

  const confidence: MeasuredTDEE["confidence"] =
    spanDays >= 14 && coverage >= 0.8 ? "alta" : coverage >= 0.65 ? "media" : "baja";

  return {
    tdee,
    meanIntake: Math.round(meanIntake),
    weightChangeKg: Math.round(weightChangeKg * 10) / 10,
    spanDays,
    loggedDays,
    coverage: Math.round(coverage * 100) / 100,
    confidence,
  };
}
