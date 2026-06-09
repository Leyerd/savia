// Estimación del gasto calórico del entrenamiento — EL PUENTE nutrición↔ejercicio.
//
// BASE CIENTÍFICA:
//  - Método MET (Compendium of Physical Activities, Ainsworth 2011):
//      kcal/min = MET × 3.5 × pesoKg / 200
//  - El MET depende del tipo de trabajo:
//      · Core/abdominales (calistenia moderada) ............ ~4.0
//      · Fuerza compuesta cerca del fallo (RIR 0-2) ........ ~6.0
//      · Acondicionamiento / HIIT (burpees, mountain) ...... ~8.0
//  - Los MET del Compendium se miden sobre la sesión TAL COMO SE EJECUTA:
//    incluyen los descansos entre series (con la frecuencia cardíaca aún
//    elevada). Por eso contamos trabajo + descanso entre series, que es lo
//    coherente con el método. Aun así es conservador: usamos solo el tiempo
//    real de la sesión, sin sumar EPOC ni el gasto post-entreno.
//
// Importante (anti doble-conteo): el TDEE usa un factor de actividad que ya
// asume entrenar. Por eso, por defecto, el gasto estimado es INFORMATIVO
// (balance energético) y NO infla el objetivo del día. El usuario puede
// activar "sumar el entreno al objetivo" en Ajustes si su factor de
// actividad es bajo (NEAT) y quiere un presupuesto dinámico.

import type { Exercise } from "../data/exercises";
import { EXERCISE_BY_ID } from "../data/exercises";
import type { SetLog, ExerciseProgress } from "../store/useStore";

type Group = Exercise["group"];

const GROUP_MET: Record<Group, number> = {
  Core: 4.0,
  Empuje: 6.0,
  Tirón: 6.0,
  Pierna: 6.0,
  Acondicionamiento: 8.0,
};

// Segundos de trabajo por repetición según el grupo (tempo aproximado).
const SEC_PER_REP: Record<Group, number> = {
  Core: 3,
  Empuje: 4,
  Tirón: 4,
  Pierna: 4,
  Acondicionamiento: 3,
};

// Segundos de trabajo efectivo de una serie (reps×tempo o segundos directos).
function setWorkSeconds(set: SetLog, group: Group): number {
  if (set.seconds && set.seconds > 0) return set.seconds;
  if (set.reps && set.reps > 0) return set.reps * SEC_PER_REP[group];
  return 0;
}

/**
 * kcal estimadas de todas las series de un ejercicio (una sesión).
 * Duración = trabajo de las series + descansos entre ellas (un descanso por
 * cada serie efectiva). Se aplica el MET del grupo a esa duración total.
 */
export function sessionKcal(sets: SetLog[], ex: Exercise, weightKg: number): number {
  const met = GROUP_MET[ex.group];
  let seconds = 0;
  for (const s of sets) {
    const work = setWorkSeconds(s, ex.group);
    if (work > 0) seconds += work + ex.rest; // trabajo + su descanso asociado
  }
  const minutes = seconds / 60;
  return (met * 3.5 * weightKg) / 200 * minutes;
}

/**
 * kcal totales quemadas en entreno en una fecha (YYYY-MM-DD), sumando todas
 * las sesiones registradas ese día en `progress`.
 */
export function burnedOnDate(
  progress: Record<string, ExerciseProgress>,
  date: string,
  weightKg: number
): number {
  let total = 0;
  for (const exId in progress) {
    const ex = EXERCISE_BY_ID[exId];
    if (!ex) continue;
    for (const session of progress[exId].sessions) {
      if (session.date === date) total += sessionKcal(session.sets, ex, weightKg);
    }
  }
  return Math.round(total);
}
