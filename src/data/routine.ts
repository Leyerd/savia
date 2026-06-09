// Rutina semanal enfocada en SIXPACK para joven de 21 años, 1.60 m.
// Revisada con evidencia (Schoenfeld 2016/2017/2022; Pelland 2025; Morton 2018):
//  - Volumen ~10-16 series/sem por grupo, frecuencia 2x/sem por grupo.
//  - Cargas livianas (7/14 kg) SÍ generan músculo si se entrena cerca del fallo (RIR 0-2).
//  - Core 3x/sem (no 5x): el abdomen se "marca" con el déficit, no con más abdominales.
//  - Más tirón horizontal + deltoides posterior (ratio tirón ≥ empuje) e isquios/glúteo 2x.
// Equipo: 2 mancuernas 7 kg, barra 14 kg, barra de dominadas, ab roller.

export interface RoutineDay {
  day: string;
  label: string;
  focus: string;
  rest?: boolean;
  blocks: { exerciseId: string; note?: string }[];
  finisher?: string;
}

export const WEEKLY_ROUTINE: RoutineDay[] = [
  {
    day: "lun",
    label: "Lunes",
    focus: "Full body fuerza + core",
    blocks: [
      { exerciseId: "sentadilla" },
      { exerciseId: "pressbanca-mancuerna" },
      { exerciseId: "remo-mancuerna" },
      { exerciseId: "peso-muerto" },
      { exerciseId: "plancha" },
    ],
    finisher: "2 vueltas: 30 s mountain climbers + 30 s descanso. Lleva cada serie a RIR 1-2.",
  },
  {
    day: "mar",
    label: "Martes",
    focus: "Core + HIIT (día principal de abdomen)",
    blocks: [
      { exerciseId: "absroller" },
      { exerciseId: "elevpiernas" },
      { exerciseId: "russian" },
      { exerciseId: "deadbug" },
      { exerciseId: "burpee" },
    ],
    finisher: "Tabata 4 min: 20 s mountain climbers / 10 s pausa ×8.",
  },
  {
    day: "mie",
    label: "Miércoles",
    focus: "Empuje (pecho · hombro · tríceps)",
    blocks: [
      { exerciseId: "pressbanca-mancuerna" },
      { exerciseId: "pressmilitar" },
      { exerciseId: "flexiones" },
      { exerciseId: "rear-delt" },
      { exerciseId: "fondos" },
    ],
    finisher: "Flexiones al fallo ×2 (descanso 90 s). Cuida la técnica.",
  },
  {
    day: "jue",
    label: "Jueves",
    focus: "Descanso activo + cardio LISS",
    rest: true,
    blocks: [
      { exerciseId: "deadbug", note: "Suave, técnica perfecta." },
      { exerciseId: "facepull", note: "Salud de hombro, sin peso pesado." },
    ],
    finisher: "30-45 min de caminata (LISS) y apunta a 8.000-10.000 pasos. Duerme 7-9 h.",
  },
  {
    day: "vie",
    label: "Viernes",
    focus: "Tirón (espalda · deltoides post · bíceps) + core",
    blocks: [
      { exerciseId: "dominadas" },
      { exerciseId: "remo-mancuerna" },
      { exerciseId: "facepull" },
      { exerciseId: "curl" },
      { exerciseId: "elevpiernas" },
    ],
    finisher: "3 series de plancha al fallo.",
  },
  {
    day: "sab",
    label: "Sábado",
    focus: "Pierna (cuádriceps · isquios · glúteo)",
    blocks: [
      { exerciseId: "peso-muerto" },
      { exerciseId: "hipthrust" },
      { exerciseId: "sentadilla", note: "Prioriza variantes unilaterales (búlgara) para más carga relativa." },
      { exerciseId: "zancada" },
      { exerciseId: "mountain" },
    ],
    finisher: "4 min de burpees a ritmo moderado.",
  },
  {
    day: "dom",
    label: "Domingo",
    focus: "Descanso total",
    rest: true,
    blocks: [],
    finisher: "Descansa, hidrátate y duerme 8 h. La recuperación marca el abdomen.",
  },
];

// Principios de entrenamiento (base científica) mostrados en la app.
export const TRAINING_GUIDE = {
  title: "Cómo entrenar para hipertrofia con poco peso",
  bullets: [
    "Entrena CERCA DEL FALLO (RIR 0-2): con 7/14 kg, llegar a 0-2 repeticiones en reserva iguala el efecto de cargas pesadas (Schoenfeld 2017).",
    "Sobrecarga progresiva: sube reps/tiempo/peso o variante cada semana. Es el motor del crecimiento.",
    "Frecuencia 2x/semana por grupo muscular y ~10-16 series semanales (Schoenfeld 2016; Pelland 2025).",
    "Para piernas usa variantes UNILATERALES (búlgara, zancada, hip thrust a 1 pierna): concentran la carga y suplen las mancuernas livianas.",
    "Más tirón que empuje (remo, face pulls) para hombros sanos y cintura visualmente más fina.",
    "El abdomen se ENTRENA 3x/semana, pero se MARCA con el déficit calórico + sueño, no con más abdominales (el spot reduction es mito).",
    "8.000-10.000 pasos/día y 7-9 h de sueño: aceleran la pérdida de grasa y protegen el músculo (Nedeltcheva 2010).",
  ],
};

// Guía nutricional (base científica) mostrada en la app.
export const NUTRITION_GUIDE = {
  title: "Cómo lograr el sixpack (nutrición)",
  bullets: [
    "El abdomen se ve al bajar a ~10-12% de grasa (hombres). Si ya estás delgado pero sin músculo, prioriza CONSTRUIR músculo (recomposición), no morir de hambre.",
    "Proteína 1.6-2.2 g/kg de masa magra, repartida en 3-5 comidas (Morton 2018; ISSN 2017).",
    "Ajusta calorías por % del gasto: déficit 10-15% para bajar grasa; pierde solo 0.5-1% del peso por semana para no perder músculo.",
    "Grasa ≥1 g/kg (mínimo hormonal); el resto, carbohidratos alrededor del entrenamiento.",
    "Hidrátate (~35 ml/kg/día) y apunta a ~14 g de fibra por cada 1000 kcal.",
    "Creatina monohidrato 3-5 g/día: el suplemento con más evidencia para fuerza y músculo.",
    "Pésate en ayunas y guíate por el promedio semanal; ajusta cada 2-3 semanas según el progreso real.",
  ],
};
