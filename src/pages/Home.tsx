import { Link } from "react-router-dom";
import { Dumbbell, Flame, ChevronRight, Bed, Camera } from "lucide-react";
import { Header } from "../components/Header";
import { MacroRing, MacroBar } from "../components/MacroRing";
import { useStore } from "../store/useStore";
import { dateKey, todayWeekdayKey } from "../lib/date";
import { sumEntries } from "../lib/totals";
import { WEEKLY_ROUTINE } from "../data/routine";
import { EXERCISE_BY_ID } from "../data/exercises";

const WK = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
function computeStreak(completedDays: Record<string, boolean>): number {
  let streak = 0;
  for (let i = 0; i < 370; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const wk = WK[d.getDay()];
    const day = WEEKLY_ROUTINE.find((x) => x.day === wk);
    const isRest = !day || day.rest || day.blocks.length === 0;
    const completed = !!completedDays[`${dateKey(d)}:${wk}`];
    if (isRest || completed) streak++;
    else if (i === 0) continue; // hoy aún pendiente: no rompe la racha
    else break;
  }
  return streak;
}

export function Home() {
  const profile = useStore((s) => s.profile);
  const diary = useStore((s) => s.diary);
  const completedDays = useStore((s) => s.completedDays);
  const targets = useStore((s) => s.targets)();
  const eatBack = useStore((s) => s.eatBack);
  const today = dateKey();
  const burned = useStore((s) => s.burnedOn)(today);
  const totals = sumEntries(diary[today]);
  const streak = computeStreak(completedDays);

  const goalKcal = targets.kcal + (eatBack ? burned : 0);

  const wk = todayWeekdayKey();
  const day = WEEKLY_ROUTINE.find((d) => d.day === wk) ?? WEEKLY_ROUTINE[0];
  const hour = new Date().getHours();
  const saludo = hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches";

  return (
    <section className="fade">
      <Header
        title={`${saludo}, ${profile.name}`}
        sub="Lo que comes alimenta lo que entrenas 🌿"
        right={streak > 0 ? <span className="pill peach" style={{ fontSize: "0.85rem" }}>🔥 {streak} días</span> : undefined}
      />

      <div className="card">
        <div className="row between" style={{ alignItems: "flex-start" }}>
          <div>
            <h3 style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Flame size={16} color="var(--peach)" /> Hoy
            </h3>
            <div className="muted tiny">Meta {goalKcal} kcal · {targets.plan.title}</div>
          </div>
          <Link to="/nutricion" className="btn btn-sm btn-ghost">Registrar</Link>
        </div>
        <div className="row" style={{ gap: 18, marginTop: 8 }}>
          <MacroRing value={totals.kcal} max={goalKcal} />
          <div className="grow">
            <MacroBar label="Proteína" value={totals.p} target={targets.protein} color="var(--m-prot)" />
            <MacroBar label="Carbos" value={totals.c} target={targets.carbs} color="var(--m-carb)" />
            <MacroBar label="Grasa" value={totals.f} target={targets.fat} color="var(--m-fat)" />
          </div>
        </div>

        {/* El puente: nutrición ⟷ ejercicio */}
        <div className="row between" style={{ marginTop: 12, gap: 8, flexWrap: "wrap" }}>
          <div className="center grow" style={{ minWidth: 70 }}>
            <div style={{ fontWeight: 700, color: "var(--m-kcal)" }}>{Math.round(totals.kcal)}</div>
            <div className="muted tiny">comido</div>
          </div>
          <div className="center grow" style={{ minWidth: 70 }}>
            <div style={{ fontWeight: 700, color: "var(--peach)" }}>{burned > 0 ? `+${burned}` : "—"}</div>
            <div className="muted tiny">entreno 🔥</div>
          </div>
          <div className="center grow" style={{ minWidth: 70 }}>
            <div style={{ fontWeight: 700, color: "var(--green)" }}>{Math.max(0, goalKcal - totals.kcal)}</div>
            <div className="muted tiny">restan</div>
          </div>
        </div>
        {burned > 0 && (
          <div className="muted tiny center" style={{ marginTop: 8 }}>
            {eatBack
              ? `Hoy entrenaste: tu objetivo subió a ${goalKcal} kcal.`
              : "Lo que comes alimenta lo que entrenas 🌿"}
          </div>
        )}
      </div>

      <div className="card">
        <div className="row between">
          <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {day.rest ? <Bed size={18} color="var(--teal)" /> : <Dumbbell size={18} color="var(--mauve)" />}
            Entreno de hoy
          </h2>
          <span className="pill mauve">{day.label}</span>
        </div>
        <div className="muted" style={{ marginBottom: 12 }}>{day.focus}</div>

        {day.blocks.length === 0 ? (
          <p className="muted tiny">Día de descanso total. {day.finisher}</p>
        ) : (
          <>
            {day.blocks.slice(0, 4).map((b) => {
              const ex = EXERCISE_BY_ID[b.exerciseId];
              return (
                <div key={b.exerciseId} className="list-item">
                  <div className="grow">
                    <div>{ex?.name}</div>
                    <div className="muted tiny">{ex?.group} · {ex?.defaultSets} sets</div>
                  </div>
                </div>
              );
            })}
            {day.blocks.length > 4 && (
              <div className="muted tiny" style={{ marginTop: 8 }}>+ {day.blocks.length - 4} ejercicios más…</div>
            )}
          </>
        )}

        <Link to="/rutina" className="btn btn-primary btn-block" style={{ marginTop: 14 }}>
          {day.rest ? "Ver movilidad" : "Comenzar entreno"} <ChevronRight size={18} />
        </Link>
      </div>

      <div className="grid2">
        <Link to="/nutricion?ai=1" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <Camera size={22} color="var(--sapphire)" />
          <div style={{ marginTop: 8, fontWeight: 700 }}>Escanear comida</div>
          <div className="muted tiny">Identifica con IA (Gemini)</div>
        </Link>
        <Link to="/progreso" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <Dumbbell size={22} color="var(--green)" />
          <div style={{ marginTop: 8, fontWeight: 700 }}>Mi progreso</div>
          <div className="muted tiny">Gráficos y niveles</div>
        </Link>
      </div>
    </section>
  );
}
