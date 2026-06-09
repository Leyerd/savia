import { useMemo, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, ReferenceLine,
} from "recharts";
import { Header } from "../components/Header";
import { useStore } from "../store/useStore";
import { EXERCISES, EXERCISE_BY_ID } from "../data/exercises";
import { sumEntries } from "../lib/totals";
import { lastNDays } from "../lib/date";
import { Trophy, Dumbbell, TrendingUp, Scale } from "lucide-react";

export function ProgressPage() {
  const progress = useStore((s) => s.progress);
  const diary = useStore((s) => s.diary);
  const weights = useStore((s) => s.weights);
  const targets = useStore((s) => s.targets)();

  const weightData = weights.map((w) => ({ name: w.date.slice(5), kg: w.kg }));

  const logged = useMemo(
    () => EXERCISES.filter((e) => (progress[e.id]?.sessions?.length ?? 0) > 0),
    [progress]
  );
  const [selId, setSelId] = useState<string | null>(logged[0]?.id ?? null);

  const totalSessions = Object.values(progress).reduce((a, p) => a + p.sessions.length, 0);
  const unlocked = Object.values(progress).reduce((a, p) => a + p.level, 0);

  const exData = useMemo(() => {
    if (!selId) return [];
    const ex = EXERCISE_BY_ID[selId];
    const p = progress[selId];
    if (!ex || !p) return [];
    const isTime = ex.levels[0].track === "tiempo";
    return p.sessions.map((s, i) => {
      const vals = s.sets.map((st) => (isTime ? st.seconds ?? 0 : st.reps ?? 0));
      const weights = s.sets.map((st) => st.weight ?? 0);
      return {
        name: `S${i + 1}`,
        best: Math.max(0, ...vals),
        volumen: s.sets.reduce((a, st) => a + (st.reps ?? 0) * (st.weight ?? 0), 0),
        peso: Math.max(0, ...weights),
        nivel: s.level + 1,
      };
    });
  }, [selId, progress]);

  const nutriData = useMemo(() => {
    return lastNDays(14).map((d) => ({
      name: d.slice(5),
      kcal: Math.round(sumEntries(diary[d]).kcal),
      p: Math.round(sumEntries(diary[d]).p),
    }));
  }, [diary]);

  const selEx = selId ? EXERCISE_BY_ID[selId] : null;
  const isTime = selEx?.levels[0].track === "tiempo";

  return (
    <section className="fade">
      <Header title="Progreso" sub="Tu evolución en peso, reps y niveles" />

      <div className="grid3">
        <div className="stat"><div className="v" style={{ color: "var(--mauve)" }}>{totalSessions}</div><div className="k">Series totales</div></div>
        <div className="stat"><div className="v" style={{ color: "var(--green)" }}>{unlocked}</div><div className="k">Niveles subidos</div></div>
        <div className="stat"><div className="v" style={{ color: "var(--peach)" }}>{logged.length}</div><div className="k">Ejercicios activos</div></div>
      </div>

      {weightData.length > 0 && (
        <div className="card" style={{ marginTop: 14 }}>
          <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Scale size={18} color="var(--green)" /> Peso corporal</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--surface0)" />
              <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 10 }} />
              <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fill: "var(--subtext)", fontSize: 10 }} width={34} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="kg" name="Peso (kg)" stroke="var(--green)" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="tiny muted center">Registra tu peso en Ajustes → Historial de peso</div>
        </div>
      )}

      <div className="card" style={{ marginTop: 14 }}>
        <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><TrendingUp size={18} color="var(--blue)" /> Calorías (14 días)</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={nutriData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface0)" />
            <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 10 }} interval={1} />
            <YAxis tick={{ fill: "var(--subtext)", fontSize: 10 }} width={34} />
            <Tooltip contentStyle={tooltipStyle} />
            <ReferenceLine y={targets.kcal} stroke="var(--mauve)" strokeDasharray="4 4" />
            <Bar dataKey="kcal" fill="var(--peach)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="tiny muted center">Línea morada = tu meta ({targets.kcal} kcal)</div>
      </div>

      {logged.length === 0 ? (
        <div className="card center muted">
          <Dumbbell size={28} style={{ opacity: 0.5 }} />
          <p>Registra series en la pestaña <strong>Rutina</strong> para ver tus gráficos de progreso aquí.</p>
        </div>
      ) : (
        <div className="card">
          <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Dumbbell size={18} color="var(--mauve)" /> Progreso por ejercicio</h2>
          <div className="chips" style={{ marginBottom: 12 }}>
            {logged.map((e) => (
              <button key={e.id} className={`chip ${selId === e.id ? "active" : ""}`} onClick={() => setSelId(e.id)}>
                {e.name.split(" ")[0]}
              </button>
            ))}
          </div>

          {selEx && (
            <>
              <div className="row between" style={{ marginBottom: 8 }}>
                <strong>{selEx.name}</strong>
                <span className="pill peach"><Trophy size={11} /> Nivel {(progress[selId!]?.level ?? 0) + 1}</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={exData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--surface0)" />
                  <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 10 }} />
                  <YAxis tick={{ fill: "var(--subtext)", fontSize: 10 }} width={30} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="best" name={isTime ? "Mejor (s)" : "Mejor reps"} stroke="var(--green)" strokeWidth={3} dot={{ r: 3 }} />
                  {!isTime && <Line type="monotone" dataKey="peso" name="Peso máx (kg)" stroke="var(--blue)" strokeWidth={2} dot={{ r: 3 }} />}
                </LineChart>
              </ResponsiveContainer>
              {!isTime && (
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={exData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--surface0)" />
                    <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 10 }} />
                    <YAxis tick={{ fill: "var(--subtext)", fontSize: 10 }} width={34} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="volumen" name="Volumen (reps×kg)" fill="var(--mauve)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}

const tooltipStyle = {
  background: "var(--mantle)",
  border: "1px solid var(--surface1)",
  borderRadius: 12,
  color: "var(--text)",
  fontSize: 12,
};
