// Cálculo de necesidades calóricas, macros y determinación AUTOMÁTICA del objetivo.
//
// BASE CIENTÍFICA:
//  - Gasto energético: ecuación de Mifflin-St Jeor (BMR) × factor de actividad.
//    (Mifflin MD et al., Am J Clin Nutr 1990 — la más precisa para población sana).
//  - % grasa corporal: método US Navy (circunferencias) o Deurenberg (IMC) como
//    respaldo (Deurenberg P et al., Br J Nutr 1991).
//  - Para ver el "sixpack" se requiere ~10-12% de grasa en hombres (~18-20% mujeres).
//    Por eso el objetivo se decide según TU grasa actual, no según tu peso.
//  - Proteína 1.6-2.2 g/kg (mayor en déficit para conservar músculo;
//    Morton RW et al., Br J Sports Med 2018, meta-análisis).

export type Sex = "m" | "f";
export type Goal = "sixpack" | "deficit" | "mantener" | "volumen";
export type Activity = "sedentario" | "ligero" | "moderado" | "activo" | "muy_activo";

export interface Profile {
  name: string;
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
  goal: Goal;
  waistCm?: number; // cintura (para % grasa US Navy)
  neckCm?: number;  // cuello   (para % grasa US Navy)
  hipCm?: number;   // cadera   (solo mujeres, US Navy)
}

const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  activo: 1.725,
  muy_activo: 1.9,
};

// ---------- % grasa corporal ----------
export function estimateBodyFat(p: Profile): { bf: number; source: "navy" | "imc" } {
  // Método US Navy (más fiable) si hay circunferencias.
  if (p.waistCm && p.neckCm && p.waistCm > p.neckCm) {
    if (p.sex === "m") {
      const bf =
        495 /
          (1.0324 - 0.19077 * Math.log10(p.waistCm - p.neckCm) + 0.15456 * Math.log10(p.heightCm)) -
        450;
      return { bf: clamp(bf), source: "navy" };
    }
    if (p.hipCm) {
      const bf =
        495 /
          (1.29579 - 0.35004 * Math.log10(p.waistCm + p.hipCm - p.neckCm) + 0.221 * Math.log10(p.heightCm)) -
        450;
      return { bf: clamp(bf), source: "navy" };
    }
  }
  // Respaldo: Deurenberg a partir del IMC.
  const bmi = p.weightKg / (p.heightCm / 100) ** 2;
  const bf = 1.2 * bmi + 0.23 * p.age - 10.8 * (p.sex === "m" ? 1 : 0) - 5.4;
  return { bf: clamp(bf), source: "imc" };
}

const clamp = (n: number) => Math.max(3, Math.min(60, Math.round(n * 10) / 10));

// ---------- Plan automático según grasa corporal ----------
// Mejoras basadas en evidencia (ISSN 2017; Morton 2018; Barakat 2020; Helms 2014):
//  - Déficit/superávit como % del TDEE (no fijo), con tope de pérdida semanal.
//  - Sujeto delgado y poco musculado (IMC<22) → RECOMPOSICIÓN, no déficit.
//  - Proteína sobre masa magra; piso de grasa 1.0 g/kg y ≥20% de kcal.
export type EffectiveGoal = "deficit" | "recomp" | "mantener" | "volumen";

export interface Plan {
  effectiveGoal: EffectiveGoal;
  pct: number; // ajuste como fracción del TDEE (ej. -0.12)
  bf: number | null;
  bfSource: "navy" | "imc" | null;
  title: string;
  rationale: string;
}

export function bmiOf(p: Profile): number {
  return p.weightKg / (p.heightCm / 100) ** 2;
}

export function resolvePlan(p: Profile): Plan {
  if (p.goal !== "sixpack") {
    const map: Record<Exclude<Goal, "sixpack">, { g: EffectiveGoal; pct: number; t: string }> = {
      deficit: { g: "deficit", pct: -0.15, t: "Déficit para bajar grasa" },
      mantener: { g: "mantener", pct: 0, t: "Mantención" },
      volumen: { g: "volumen", pct: 0.1, t: "Volumen / ganar músculo" },
    };
    const m = map[p.goal];
    return { effectiveGoal: m.g, pct: m.pct, bf: null, bfSource: null, title: m.t, rationale: "Objetivo elegido manualmente." };
  }

  // Modo Sixpack: decide según % grasa y musculatura (IMC).
  const { bf, source } = estimateBodyFat(p);
  const male = p.sex === "m";
  const bmi = bmiOf(p);
  const lean = bmi < 22; // delgado / poco musculado
  const T = male ? { alto: 20, medio: 15, bajo: 12 } : { alto: 28, medio: 24, bajo: 20 };

  let effectiveGoal: EffectiveGoal, pct: number, title: string, rationale: string;
  if (bf > T.alto) {
    effectiveGoal = "deficit"; pct = -0.18;
    title = "Déficit (prioridad: bajar grasa)";
    rationale = `Tu grasa estimada (${bf}%) está sobre el umbral para ver el abdomen. Déficit claro + proteína alta; el abdomen aparece al acercarte a ~${male ? 12 : 20}%.`;
  } else if (bf > T.medio) {
    effectiveGoal = "deficit"; pct = -0.12;
    title = "Déficit moderado (recorte)";
    rationale = `Estás en buen rango (${bf}%). Un déficit del 12% revela el abdomen sin sacrificar músculo. Proteína alta y fuerza.`;
  } else if (bf > T.bajo) {
    if (lean) {
      effectiveGoal = "recomp"; pct = 0;
      title = "Recomposición (mantención)";
      rationale = `Grasa ${bf}% e IMC ${bmi.toFixed(1)}: estás delgado pero falta músculo. Lo correcto NO es déficit (te verías "flaco sin marca"), sino comer en mantención con mucha proteína y progresar en fuerza para construir el músculo abdominal. Pierdes grasa y ganas músculo a la vez.`;
    } else {
      effectiveGoal = "deficit"; pct = -0.08;
      title = "Déficit suave (recorte final)";
      rationale = `Cerca del objetivo (${bf}%). Un déficit leve del 8% pule la grasa restante manteniendo el músculo.`;
    }
  } else {
    effectiveGoal = "volumen"; pct = 0.1;
    title = "Lean bulk (construir músculo)";
    rationale = `Ya muy definido (${bf}%). El abdomen se ve cuando el músculo crece: un superávit del 10% + fuerza desarrolla los rectos abdominales. Luego un mini-corte los marca.`;
  }
  return { effectiveGoal, pct, bf, bfSource: source, title, rationale };
}

export interface MacroTargets {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;   // g objetivo
  waterMl: number; // ml objetivo
  bmr: number;
  tdee: number;
  ffm: number;     // masa magra estimada (kg)
  plan: Plan;
}

export function computeTargets(p: Profile): MacroTargets {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age;
  const bmr = p.sex === "m" ? base + 5 : base - 161;
  const tdee = bmr * ACTIVITY_FACTOR[p.activity];

  const plan = resolvePlan(p);

  // Ajuste por % del TDEE, con tope de pérdida semanal de 1%/sem (0.6% si muy magro).
  let kcal = tdee * (1 + plan.pct);
  const maxWeeklyLossPct = (plan.bf ?? 20) < (p.sex === "m" ? 13 : 21) ? 0.006 : 0.01;
  const maxDailyDeficit = (maxWeeklyLossPct * p.weightKg * 7700) / 7;
  if (tdee - kcal > maxDailyDeficit) kcal = tdee - maxDailyDeficit;
  kcal = Math.max(bmr * 1.05, kcal); // nunca por debajo de ~BMR

  // Masa magra para proteína.
  const { bf } = estimateBodyFat(p);
  const ffm = p.weightKg * (1 - bf / 100);
  const cutting = plan.pct < 0;
  const protein = Math.round((cutting ? 2.2 : 1.8) * ffm); // g/kg de MASA MAGRA

  // Grasa: piso 1.0 g/kg y al menos 20% de las kcal.
  const fat = Math.round(Math.max(1.0 * p.weightKg, (0.2 * kcal) / 9));
  const carbs = Math.max(0, Math.round((kcal - (protein * 4 + fat * 9)) / 4));

  const fiber = Math.round((14 * kcal) / 1000);   // 14 g por 1000 kcal
  const waterMl = Math.round(35 * p.weightKg);     // 35 ml/kg base

  return {
    kcal: Math.round(kcal), protein, carbs, fat, fiber, waterMl,
    bmr: Math.round(bmr), tdee: Math.round(tdee), ffm: Math.round(ffm * 10) / 10, plan,
  };
}

export const DEFAULT_PROFILE: Profile = {
  name: "Atleta",
  sex: "m",
  age: 21,
  heightCm: 160,
  weightKg: 54,
  activity: "moderado",
  goal: "sixpack",
};
