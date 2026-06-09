import { create } from "zustand";
import { persist } from "zustand/middleware";
import { computeTargets, DEFAULT_PROFILE, type MacroTargets, type Profile } from "../lib/macros";
import { EXERCISE_BY_ID } from "../data/exercises";
import type { Food } from "../data/foods";
import { dateKey } from "../lib/date";

// Alimento creado por el usuario o la IA (valores por 100 g, como los de la base).
export type CustomFood = Food & { custom: true; source?: "ia" | "manual" };

export interface FoodEntry {
  id: string;
  foodId?: string;
  name: string;
  grams: number;
  kcal: number;
  p: number;
  c: number;
  f: number;
  meal: Meal;
}
export type Meal = "Desayuno" | "Almuerzo" | "Once" | "Cena" | "Snack";

export interface SetLog {
  reps?: number;
  seconds?: number;
  weight?: number;
}
export interface SessionLog {
  date: string;
  level: number;
  sets: SetLog[];
}
export interface ExerciseProgress {
  level: number;          // nivel/variante actual (índice)
  sessions: SessionLog[];
}

export interface WeightEntry { date: string; kg: number; }

interface State {
  profile: Profile;
  apiKey: string;
  diary: Record<string, FoodEntry[]>;          // por fecha
  progress: Record<string, ExerciseProgress>;  // por exerciseId
  completedDays: Record<string, boolean>;       // "YYYY-MM-DD:dayKey" -> true
  weights: WeightEntry[];                        // historial de peso corporal
  water: Record<string, number>;                 // ml de agua por fecha
  theme: string;                                 // paleta (mocha, macchiato, frappe, latte, amoled)
  bg: string;                                    // fondo (aurora, mesh, sunset, ocean, grid, solid)
  customFoods: CustomFood[];                      // alimentos creados por el usuario o la IA

  // acciones
  setProfile: (p: Profile) => void;
  setApiKey: (k: string) => void;
  setTheme: (t: string) => void;
  setBg: (b: string) => void;
  addWater: (date: string, ml: number) => void;
  addCustomFood: (f: Omit<CustomFood, "id" | "custom">) => CustomFood;
  removeCustomFood: (id: string) => void;
  exportData: () => string;
  importData: (json: string) => boolean;
  addFood: (date: string, entry: Omit<FoodEntry, "id">) => void;
  removeFood: (date: string, id: string) => void;
  logExercise: (exerciseId: string, sets: SetLog[]) => { leveledUp: boolean };
  setLevel: (exerciseId: string, level: number) => void;
  markDayComplete: (dayKey: string) => void;
  addWeight: (kg: number, date?: string) => void;
  removeWeight: (date: string) => void;

  targets: () => MacroTargets;
  getLevel: (exerciseId: string) => number;
}

let counter = 0;
const uid = () => `${dateKey()}-${counter++}-${performance.now().toString(36)}`;

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      apiKey: "",
      diary: {},
      progress: {},
      completedDays: {},
      weights: [],
      water: {},
      theme: "savia",
      bg: "aurora",
      customFoods: [],

      setProfile: (p) => set({ profile: p }),
      setApiKey: (k) => set({ apiKey: k }),
      setTheme: (t) => set({ theme: t }),
      setBg: (b) => set({ bg: b }),

      addWater: (date, ml) =>
        set((s) => ({ water: { ...s.water, [date]: Math.max(0, (s.water[date] ?? 0) + ml) } })),

      addCustomFood: (f) => {
        const food: CustomFood = { ...f, id: `custom-${uid()}`, custom: true };
        set((s) => ({ customFoods: [food, ...s.customFoods] }));
        return food;
      },
      removeCustomFood: (id) =>
        set((s) => ({ customFoods: s.customFoods.filter((f) => f.id !== id) })),

      exportData: () => {
        const s = get();
        return JSON.stringify(
          { profile: s.profile, diary: s.diary, progress: s.progress, weights: s.weights,
            water: s.water, completedDays: s.completedDays, customFoods: s.customFoods,
            theme: s.theme, bg: s.bg, v: 1 },
          null, 2
        );
      },

      importData: (json) => {
        try {
          const d = JSON.parse(json);
          set((s) => ({
            profile: d.profile ?? s.profile,
            diary: d.diary ?? s.diary,
            progress: d.progress ?? s.progress,
            weights: d.weights ?? s.weights,
            water: d.water ?? s.water,
            completedDays: d.completedDays ?? s.completedDays,
            customFoods: d.customFoods ?? s.customFoods,
            theme: d.theme ?? s.theme,
            bg: d.bg ?? s.bg,
          }));
          return true;
        } catch { return false; }
      },

      addFood: (date, entry) =>
        set((s) => ({
          diary: { ...s.diary, [date]: [...(s.diary[date] ?? []), { ...entry, id: uid() }] },
        })),

      removeFood: (date, id) =>
        set((s) => ({
          diary: { ...s.diary, [date]: (s.diary[date] ?? []).filter((e) => e.id !== id) },
        })),

      getLevel: (exerciseId) => get().progress[exerciseId]?.level ?? 0,

      setLevel: (exerciseId, level) =>
        set((s) => {
          const cur = s.progress[exerciseId] ?? { level: 0, sessions: [] };
          return { progress: { ...s.progress, [exerciseId]: { ...cur, level } } };
        }),

      logExercise: (exerciseId, sets) => {
        const ex = EXERCISE_BY_ID[exerciseId];
        const s = get();
        const cur = s.progress[exerciseId] ?? { level: 0, sessions: [] };
        const session: SessionLog = { date: dateKey(), level: cur.level, sets };

        // ¿Cumplió el objetivo del nivel en TODOS los sets? -> candidato a subir
        let leveledUp = false;
        let newLevel = cur.level;
        if (ex) {
          const lvl = ex.levels[cur.level];
          const metric = (st: SetLog) => (lvl.track === "tiempo" ? st.seconds ?? 0 : st.reps ?? 0);
          const allHit = sets.length > 0 && sets.every((st) => metric(st) >= lvl.target);

          // sesión previa también cumplió => 2 seguidas => sube de nivel
          const prev = cur.sessions[cur.sessions.length - 1];
          const prevHit =
            prev &&
            prev.level === cur.level &&
            prev.sets.length > 0 &&
            prev.sets.every((st) => metric(st) >= lvl.target);

          if (allHit && prevHit && cur.level < ex.levels.length - 1) {
            newLevel = cur.level + 1;
            leveledUp = true;
          }
        }

        set({
          progress: {
            ...s.progress,
            [exerciseId]: { level: newLevel, sessions: [...cur.sessions, session] },
          },
        });
        return { leveledUp };
      },

      markDayComplete: (dayKey) =>
        set((s) => ({ completedDays: { ...s.completedDays, [`${dateKey()}:${dayKey}`]: true } })),

      addWeight: (kg, date = dateKey()) =>
        set((s) => {
          const rest = s.weights.filter((w) => w.date !== date); // un registro por día
          const weights = [...rest, { date, kg }].sort((a, b) => a.date.localeCompare(b.date));
          const latest = weights[weights.length - 1];
          // mantener el perfil sincronizado con el peso más reciente (para recalcular macros)
          const profile = latest ? { ...s.profile, weightKg: latest.kg } : s.profile;
          return { weights, profile };
        }),

      removeWeight: (date) =>
        set((s) => ({ weights: s.weights.filter((w) => w.date !== date) })),

      targets: () => computeTargets(get().profile),
    }),
    { name: "savia-store-v1" }
  )
);
