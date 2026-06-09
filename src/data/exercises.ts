// Ejercicios con sistema de progresión por NIVELES (variantes que se desbloquean).
// Equipo disponible: 2 mancuernas (máx 7 kg c/u), barra (máx 14 kg),
// barra de dominadas (pull-ups) y abs roller.

export type Equipment = "mancuernas" | "barra" | "dominadas" | "absroller" | "peso corporal";
export type Track = "reps" | "tiempo"; // tiempo en segundos

export interface ExerciseLevel {
  name: string;          // nombre de la variante de ese nivel
  cue: string;           // técnica / instrucción breve
  track: Track;
  target: number;        // objetivo para "dominar" el nivel (reps o segundos por set)
}

export interface Exercise {
  id: string;
  name: string;          // nombre base del movimiento
  group: "Core" | "Empuje" | "Tirón" | "Pierna" | "Acondicionamiento";
  equipment: Equipment[];
  defaultSets: number;
  rest: number;          // descanso sugerido en segundos
  // El usuario sube de nivel cuando logra el target en todos los sets ~2 sesiones seguidas.
  levels: ExerciseLevel[];
  progressionTip: string;
}

export const EXERCISES: Exercise[] = [
  // ===================== CORE / ABS =====================
  {
    id: "crunch",
    name: "Crunch / Encogimiento",
    group: "Core",
    equipment: ["peso corporal", "mancuernas"],
    defaultSets: 4,
    rest: 45,
    levels: [
      { name: "Crunch básico", cue: "Sube los hombros llevando costillas a la pelvis, sin tirar del cuello.", track: "reps", target: 20 },
      { name: "Crunch con pausa", cue: "Aguanta 2 s arriba en cada repetición.", track: "reps", target: 20 },
      { name: "Crunch con peso", cue: "Sostén una mancuerna en el pecho.", track: "reps", target: 15 },
      { name: "Crunch peso 7 kg", cue: "Mancuerna de 7 kg detrás de la nuca, control total.", track: "reps", target: 15 },
    ],
    progressionTip: "Cuando hagas el target en los 4 sets dos sesiones seguidas, sube de variante.",
  },
  {
    id: "plancha",
    name: "Plancha (Plank)",
    group: "Core",
    equipment: ["peso corporal"],
    defaultSets: 3,
    rest: 45,
    levels: [
      { name: "Plancha apoyo", cue: "Antebrazos y rodillas, espalda recta.", track: "tiempo", target: 40 },
      { name: "Plancha completa", cue: "Antebrazos y punta de pies, glúteo y abdomen apretados.", track: "tiempo", target: 60 },
      { name: "Plancha + toque hombro", cue: "Toca hombro contrario sin mover la cadera.", track: "tiempo", target: 60 },
      { name: "Plancha con peso", cue: "Disco/mancuerna sobre la espalda baja (ayuda externa).", track: "tiempo", target: 60 },
    ],
    progressionTip: "Suma 5–10 s por sesión hasta llegar al target, luego cambia de variante.",
  },
  {
    id: "absroller",
    name: "Ab Roller (rueda abdominal)",
    group: "Core",
    equipment: ["absroller"],
    defaultSets: 3,
    rest: 60,
    levels: [
      { name: "Rollout de rodillas (parcial)", cue: "De rodillas, rueda corto y vuelve sin arquear la espalda.", track: "reps", target: 10 },
      { name: "Rollout de rodillas completo", cue: "Extiende hasta casi tocar el suelo, abdomen firme.", track: "reps", target: 12 },
      { name: "Rollout de pie (parcial)", cue: "De pie, rueda hasta donde controles.", track: "reps", target: 6 },
      { name: "Rollout de pie completo", cue: "Extensión completa de pie. Nivel élite.", track: "reps", target: 8 },
    ],
    progressionTip: "El ab roller es exigente: prioriza técnica perfecta antes de avanzar nivel.",
  },
  {
    id: "elevpiernas",
    name: "Elevación de piernas colgado",
    group: "Core",
    equipment: ["dominadas"],
    defaultSets: 4,
    rest: 60,
    levels: [
      { name: "Rodillas al pecho (suelo)", cue: "Acostado, lleva rodillas al pecho.", track: "reps", target: 20 },
      { name: "Rodillas colgado", cue: "Colgado de la barra, sube rodillas a 90°.", track: "reps", target: 15 },
      { name: "Piernas rectas colgado", cue: "Sube piernas estiradas a la horizontal.", track: "reps", target: 12 },
      { name: "Toes to bar", cue: "Lleva los pies hasta tocar la barra.", track: "reps", target: 10 },
    ],
    progressionTip: "Controla la bajada (sin balanceo) para que trabaje el abdomen y no el impulso.",
  },
  {
    id: "russian",
    name: "Giro ruso (oblicuos)",
    group: "Core",
    equipment: ["peso corporal", "mancuernas"],
    defaultSets: 3,
    rest: 45,
    levels: [
      { name: "Giro sin peso", cue: "Sentado, pies en suelo, gira el torso lado a lado.", track: "reps", target: 30 },
      { name: "Giro pies elevados", cue: "Levanta los pies del suelo.", track: "reps", target: 30 },
      { name: "Giro con mancuerna", cue: "Sostén 1 mancuerna y gira tocando el suelo.", track: "reps", target: 24 },
      { name: "Giro 7 kg pies elevados", cue: "Mancuerna 7 kg + pies elevados.", track: "reps", target: 24 },
    ],
    progressionTip: "Cuenta cada toque a un lado como 1 repetición.",
  },
  {
    id: "deadbug",
    name: "Dead bug (anti-extensión)",
    group: "Core",
    equipment: ["peso corporal"],
    defaultSets: 3,
    rest: 40,
    levels: [
      { name: "Dead bug básico", cue: "Boca arriba, extiende brazo y pierna opuestos sin despegar la lumbar.", track: "reps", target: 16 },
      { name: "Dead bug lento", cue: "3 s para extender, 3 s para volver.", track: "reps", target: 16 },
      { name: "Dead bug con mancuernas", cue: "Mancuernas livianas en manos.", track: "reps", target: 16 },
    ],
    progressionTip: "Clave para proteger la zona lumbar y marcar el recto abdominal inferior.",
  },

  // ===================== EMPUJE =====================
  {
    id: "pressbanca-mancuerna",
    name: "Press de pecho con mancuernas",
    group: "Empuje",
    equipment: ["mancuernas"],
    defaultSets: 4,
    rest: 90,
    levels: [
      { name: "Press piso 5 kg", cue: "Tendido en el piso, baja codos a 45°.", track: "reps", target: 15 },
      { name: "Press piso 7 kg", cue: "Mancuernas de 7 kg, control en la bajada.", track: "reps", target: 15 },
      { name: "Press piso 7 kg tempo", cue: "3 s de bajada, pausa 1 s abajo.", track: "reps", target: 12 },
      { name: "Press piso unilateral 7 kg", cue: "Una mano a la vez (más carga relativa).", track: "reps", target: 12 },
    ],
    progressionTip: "Sin banco, el press de piso es seguro y efectivo. Sube reps antes que dejar el 7 kg.",
  },
  {
    id: "flexiones",
    name: "Flexiones de brazos",
    group: "Empuje",
    equipment: ["peso corporal"],
    defaultSets: 4,
    rest: 60,
    levels: [
      { name: "Flexión inclinada", cue: "Manos elevadas (mesa/silla).", track: "reps", target: 15 },
      { name: "Flexión completa", cue: "Pecho casi al suelo, cuerpo recto.", track: "reps", target: 15 },
      { name: "Flexión diamante", cue: "Manos juntas, más tríceps.", track: "reps", target: 12 },
      { name: "Flexión con peso/declinada", cue: "Pies elevados o disco en la espalda.", track: "reps", target: 12 },
    ],
    progressionTip: "Combina con el press de mancuernas para un pecho completo.",
  },
  {
    id: "pressmilitar",
    name: "Press militar (hombros)",
    group: "Empuje",
    equipment: ["mancuernas", "barra"],
    defaultSets: 4,
    rest: 90,
    levels: [
      { name: "Press mancuernas 5 kg", cue: "De pie, empuja sobre la cabeza sin arquear.", track: "reps", target: 15 },
      { name: "Press mancuernas 7 kg", cue: "Control total, core firme.", track: "reps", target: 12 },
      { name: "Press barra 10–14 kg", cue: "Barra al frente, sube vertical.", track: "reps", target: 12 },
      { name: "Press barra 14 kg tempo", cue: "Bajada lenta 3 s.", track: "reps", target: 10 },
    ],
    progressionTip: "Hombros marcados mejoran el efecto visual del sixpack (cintura más estrecha).",
  },
  {
    id: "fondos",
    name: "Fondos de tríceps",
    group: "Empuje",
    equipment: ["peso corporal"],
    defaultSets: 3,
    rest: 60,
    levels: [
      { name: "Fondos en silla", cue: "Manos en silla, baja codos atrás.", track: "reps", target: 15 },
      { name: "Fondos pies elevados", cue: "Sube los pies para más carga.", track: "reps", target: 15 },
      { name: "Fondos con peso", cue: "Disco/mancuerna sobre los muslos.", track: "reps", target: 12 },
    ],
    progressionTip: "No bajes más de 90° en el hombro para cuidar la articulación.",
  },

  // ===================== TIRÓN =====================
  {
    id: "dominadas",
    name: "Dominadas (Pull-ups)",
    group: "Tirón",
    equipment: ["dominadas"],
    defaultSets: 4,
    rest: 120,
    levels: [
      { name: "Colgado + isométrico", cue: "Cuélgate y aguanta arriba con salto.", track: "tiempo", target: 30 },
      { name: "Dominada negativa", cue: "Salta arriba y baja lento 4–5 s.", track: "reps", target: 8 },
      { name: "Dominada completa", cue: "Mentón sobre la barra, sin balanceo.", track: "reps", target: 8 },
      { name: "Dominada con peso", cue: "Mancuerna entre los pies.", track: "reps", target: 8 },
    ],
    progressionTip: "Espalda ancha = cintura visualmente más fina. La gran aliada del sixpack.",
  },
  {
    id: "remo-mancuerna",
    name: "Remo con mancuerna",
    group: "Tirón",
    equipment: ["mancuernas"],
    defaultSets: 4,
    rest: 75,
    levels: [
      { name: "Remo 5 kg", cue: "Apoyo en silla, tira el codo atrás.", track: "reps", target: 15 },
      { name: "Remo 7 kg", cue: "Aprieta la escápula arriba.", track: "reps", target: 15 },
      { name: "Remo 7 kg tempo", cue: "2 s de bajada controlada.", track: "reps", target: 12 },
      { name: "Remo 7 kg a 2 manos en banca", cue: "Tendido boca abajo en banca/cama firme.", track: "reps", target: 12 },
    ],
    progressionTip: "Mantén la espalda neutra; no gires el torso para subir más peso.",
  },
  {
    id: "rear-delt",
    name: "Aperturas posteriores (deltoides posterior)",
    group: "Tirón",
    equipment: ["mancuernas"],
    defaultSets: 3,
    rest: 60,
    levels: [
      { name: "Pájaro 3 kg", cue: "Inclinado al frente, abre los brazos llevando codos atrás-arriba.", track: "reps", target: 15 },
      { name: "Pájaro 5 kg", cue: "Aprieta las escápulas, sin usar impulso.", track: "reps", target: 15 },
      { name: "Pájaro 7 kg tempo", cue: "2 s de bajada controlada.", track: "reps", target: 12 },
    ],
    progressionTip: "Equilibra el exceso de empuje: protege el hombro y mejora la postura (ratio tirón ≥ empuje).",
  },
  {
    id: "facepull",
    name: "Face pull (banda o toalla)",
    group: "Tirón",
    equipment: ["peso corporal"],
    defaultSets: 3,
    rest: 45,
    levels: [
      { name: "Face pull con banda", cue: "Tira hacia la cara separando las manos, codos altos.", track: "reps", target: 18 },
      { name: "Face pull + rotación externa", cue: "Termina rotando los antebrazos hacia arriba.", track: "reps", target: 15 },
      { name: "Remo invertido bajo la barra", cue: "Cuélgate bajo la barra de dominadas y tira el pecho.", track: "reps", target: 12 },
    ],
    progressionTip: "Rotadores externos = hombros sanos. Clave si haces mucho empuje.",
  },
  {
    id: "hipthrust",
    name: "Hip thrust (empuje de cadera)",
    group: "Pierna",
    equipment: ["peso corporal", "mancuernas", "barra"],
    defaultSets: 4,
    rest: 75,
    levels: [
      { name: "Puente de glúteo", cue: "Espalda en el suelo, sube la cadera apretando el glúteo.", track: "reps", target: 20 },
      { name: "Hip thrust en banca", cue: "Espalda alta apoyada, rango completo.", track: "reps", target: 18 },
      { name: "Hip thrust con peso 7-14 kg", cue: "Peso sobre la cadera, pausa arriba 1 s.", track: "reps", target: 15 },
      { name: "Hip thrust a 1 pierna", cue: "Una pierna; reto de fuerza y estabilidad.", track: "reps", target: 12 },
    ],
    progressionTip: "Glúteo e isquios: cadena posterior fuerte mejora postura y equilibra el cuádriceps.",
  },
  {
    id: "curl",
    name: "Curl de bíceps",
    group: "Tirón",
    equipment: ["mancuernas", "barra"],
    defaultSets: 3,
    rest: 60,
    levels: [
      { name: "Curl mancuernas 5 kg", cue: "Codos pegados al cuerpo.", track: "reps", target: 15 },
      { name: "Curl mancuernas 7 kg", cue: "Sin balanceo, baja lento.", track: "reps", target: 12 },
      { name: "Curl barra 10–14 kg", cue: "Barra, sube controlado.", track: "reps", target: 12 },
      { name: "Curl 21s", cue: "7 abajo + 7 arriba + 7 completas.", track: "reps", target: 21 },
    ],
    progressionTip: "Accesorio: prioriza dominadas y remo para la espalda.",
  },

  // ===================== PIERNA =====================
  {
    id: "sentadilla",
    name: "Sentadilla",
    group: "Pierna",
    equipment: ["peso corporal", "mancuernas", "barra"],
    defaultSets: 4,
    rest: 90,
    levels: [
      { name: "Sentadilla peso corporal", cue: "Baja hasta muslos paralelos, pecho arriba.", track: "reps", target: 20 },
      { name: "Sentadilla goblet 7 kg", cue: "1 mancuerna al pecho.", track: "reps", target: 15 },
      { name: "Sentadilla barra 14 kg", cue: "Barra en la espalda alta.", track: "reps", target: 15 },
      { name: "Sentadilla búlgara 7 kg", cue: "Pie atrás elevado, 1 pierna.", track: "reps", target: 12 },
    ],
    progressionTip: "Las piernas son el mayor gasto calórico: ayudan a quemar grasa abdominal.",
  },
  {
    id: "zancada",
    name: "Zancadas (Lunges)",
    group: "Pierna",
    equipment: ["peso corporal", "mancuernas"],
    defaultSets: 3,
    rest: 75,
    levels: [
      { name: "Zancada estática", cue: "Baja la rodilla atrás sin tocar el suelo.", track: "reps", target: 20 },
      { name: "Zancada caminando", cue: "Avanza alternando piernas.", track: "reps", target: 20 },
      { name: "Zancada con mancuernas 7 kg", cue: "1 mancuerna en cada mano.", track: "reps", target: 16 },
    ],
    progressionTip: "Cuenta el total de pasos (ambas piernas) como repeticiones.",
  },
  {
    id: "peso-muerto",
    name: "Peso muerto rumano",
    group: "Pierna",
    equipment: ["mancuernas", "barra"],
    defaultSets: 4,
    rest: 90,
    levels: [
      { name: "PM rumano 5 kg", cue: "Bisagra de cadera, espalda recta, baja a media canilla.", track: "reps", target: 15 },
      { name: "PM rumano 7 kg mancuernas", cue: "Siente el estiramiento del femoral.", track: "reps", target: 15 },
      { name: "PM rumano barra 14 kg", cue: "Barra pegada a las piernas.", track: "reps", target: 15 },
      { name: "PM rumano 1 pierna 7 kg", cue: "Unilateral, reto de equilibrio.", track: "reps", target: 12 },
    ],
    progressionTip: "Trabaja femoral y glúteo; mantén la columna neutra siempre.",
  },

  // ===================== ACONDICIONAMIENTO =====================
  {
    id: "burpee",
    name: "Burpees",
    group: "Acondicionamiento",
    equipment: ["peso corporal"],
    defaultSets: 4,
    rest: 60,
    levels: [
      { name: "Burpee sin salto", cue: "Sin flexión ni salto, ritmo constante.", track: "reps", target: 12 },
      { name: "Burpee completo", cue: "Flexión abajo + salto arriba.", track: "reps", target: 15 },
      { name: "Burpee + dominada", cue: "Termina con una dominada.", track: "reps", target: 10 },
    ],
    progressionTip: "Quema-grasa por excelencia para revelar el abdomen.",
  },
  {
    id: "mountain",
    name: "Mountain climbers",
    group: "Acondicionamiento",
    equipment: ["peso corporal"],
    defaultSets: 4,
    rest: 40,
    levels: [
      { name: "Ritmo medio", cue: "En plancha, lleva rodillas al pecho alternando.", track: "tiempo", target: 30 },
      { name: "Ritmo rápido", cue: "Acelera manteniendo cadera baja.", track: "tiempo", target: 45 },
      { name: "Cruzado", cue: "Rodilla al codo contrario (oblicuos).", track: "tiempo", target: 45 },
    ],
    progressionTip: "Cardio + core a la vez. Ideal al final de la sesión.",
  },
];

export const EXERCISE_BY_ID: Record<string, Exercise> = Object.fromEntries(
  EXERCISES.map((e) => [e.id, e])
);
