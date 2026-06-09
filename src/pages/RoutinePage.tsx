import { useState } from "react";
import { Header } from "../components/Header";
import { Sheet } from "../components/Sheet";
import { RestTimer } from "../components/RestTimer";
import { useToast } from "../components/Toast";
import { WEEKLY_ROUTINE, NUTRITION_GUIDE, TRAINING_GUIDE } from "../data/routine";
import { EXERCISE_BY_ID, type Exercise } from "../data/exercises";
import { useStore, type SetLog } from "../store/useStore";
import { sessionKcal } from "../lib/energy";
import { todayWeekdayKey, dateKey } from "../lib/date";
import { Timer, Lock, Trophy, Info, Dumbbell, Flame, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";

export function RoutinePage() {
  const [sel, setSel] = useState(todayWeekdayKey());
  const [logEx, setLogEx] = useState<Exercise | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const day = WEEKLY_ROUTINE.find((d) => d.day === sel) ?? WEEKLY_ROUTINE[0];

  return (
    <section className="fade">
      <Header
        title="Rutina semanal"
        sub="Enfoque sixpack · progresión por niveles"
        right={<button className="iconbtn" onClick={() => setShowGuide(true)}><Info size={18} /></button>}
      />

      <div className="chips" style={{ marginBottom: 14 }}>
        {WEEKLY_ROUTINE.map((d) => (
          <button key={d.day} className={`chip ${d.day === sel ? "active" : ""}`} onClick={() => setSel(d.day)}>
            {d.label.slice(0, 3)}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="row between">
          <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Dumbbell size={18} color="var(--mauve)" /> {day.label}
          </h2>
          {day.rest && <span className="pill green">Descanso</span>}
        </div>
        <div className="muted">{day.focus}</div>
      </div>

      {day.blocks.map((b) => {
        const ex = EXERCISE_BY_ID[b.exerciseId];
        if (!ex) return null;
        return <ExerciseCard key={b.exerciseId} ex={ex} note={b.note} onLog={() => setLogEx(ex)} />;
      })}

      {day.finisher && (
        <div className="card" style={{ borderColor: "rgba(250,179,135,0.3)" }}>
          <h3 style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--peach)" }}>
            <Flame size={16} /> Remate (finisher)
          </h3>
          <div>{day.finisher}</div>
        </div>
      )}

      {!day.rest && day.blocks.length > 0 && <CompleteDayButton dayKey={day.day} />}

      {logEx && <LogSheet ex={logEx} onClose={() => setLogEx(null)} />}

      <Sheet open={showGuide} onClose={() => setShowGuide(false)}>
        <h2>{TRAINING_GUIDE.title}</h2>
        {TRAINING_GUIDE.bullets.map((t, i) => (
          <div key={i} className="list-item"><div>🏋️ {t}</div></div>
        ))}
        <h2 style={{ marginTop: 16 }}>{NUTRITION_GUIDE.title}</h2>
        {NUTRITION_GUIDE.bullets.map((t, i) => (
          <div key={i} className="list-item"><div>✅ {t}</div></div>
        ))}
        <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={() => setShowGuide(false)}>Entendido</button>
      </Sheet>
    </section>
  );
}

function ExerciseCard({ ex, note, onLog }: { ex: Exercise; note?: string; onLog: () => void }) {
  const level = useStore((s) => s.getLevel(ex.id));
  const setLevel = useStore((s) => s.setLevel);
  const lvl = ex.levels[level];
  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <div className="row between">
        <div className="grow">
          <div className="row" style={{ gap: 8 }}>
            <strong>{ex.name}</strong>
            <span className="pill mauve">{ex.group}</span>
          </div>
          <div className="muted tiny" style={{ marginTop: 2 }}>
            {ex.defaultSets} sets · descanso {ex.rest}s
          </div>
        </div>
        <button className="iconbtn" onClick={() => setOpen((o) => !o)}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div className="list-item" style={{ marginTop: 10 }}>
        <Trophy size={18} color="var(--yellow)" />
        <div className="grow">
          <div style={{ fontWeight: 600 }}>Nivel {level + 1}: {lvl.name}</div>
          <div className="muted tiny">{lvl.cue}</div>
        </div>
        <span className="pill peach">
          {lvl.track === "tiempo" ? <><Timer size={11} /> {lvl.target}s</> : `${lvl.target} reps`}
        </span>
      </div>

      <div className="row between" style={{ marginTop: 10 }}>
        <div className="levels">
          {ex.levels.map((_, i) => <span key={i} className={`dot ${i <= level ? "on" : ""}`} />)}
        </div>
        <button className="btn btn-primary btn-sm" onClick={onLog}>Registrar serie</button>
      </div>

      {open && (
        <div style={{ marginTop: 12 }}>
          <div className="muted tiny" style={{ marginBottom: 8 }}>💡 {ex.progressionTip}</div>
          {note && <div className="tiny" style={{ color: "var(--teal)" }}>Nota: {note}</div>}
          <h3 style={{ marginTop: 10 }}>Niveles desbloqueables</h3>
          {ex.levels.map((l, i) => (
            <div key={i} className="list-item" style={{ opacity: i <= level ? 1 : 0.55 }}>
              {i <= level ? <Trophy size={15} color="var(--green)" /> : <Lock size={15} />}
              <div className="grow">
                <div className="tiny" style={{ fontWeight: 600 }}>Nivel {i + 1}: {l.name}</div>
                <div className="muted tiny">{l.cue}</div>
              </div>
              {i <= level && i !== level && (
                <button className="btn btn-ghost btn-sm" onClick={() => setLevel(ex.id, i)}>Usar</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LogSheet({ ex, onClose }: { ex: Exercise; onClose: () => void }) {
  const level = useStore((s) => s.getLevel(ex.id));
  const logExercise = useStore((s) => s.logExercise);
  const weightKg = useStore((s) => s.profile.weightKg);
  const toast = useToast((s) => s.show);
  const lvl = ex.levels[level];
  const isTime = lvl.track === "tiempo";

  const [sets, setSets] = useState<SetLog[]>(
    Array.from({ length: ex.defaultSets }, () => (isTime ? { seconds: lvl.target } : { reps: lvl.target, weight: 0 }))
  );

  const update = (i: number, patch: Partial<SetLog>) =>
    setSets((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const save = () => {
    const { leveledUp } = logExercise(ex.id, sets);
    const kcal = Math.round(sessionKcal(sets, ex, weightKg));
    if (leveledUp) toast(`🏆 ¡Subiste a Nivel ${level + 2}: ${ex.levels[level + 1].name}!`, "success");
    else toast(kcal > 0 ? `Serie registrada ✅ · ~${kcal} kcal 🔥` : "Serie registrada ✅", "success");
    onClose();
  };

  return (
    <Sheet open onClose={onClose}>
      <h2>{ex.name}</h2>
      <div className="muted tiny" style={{ marginBottom: 6 }}>
        Nivel {level + 1}: {lvl.name} · objetivo {lvl.target}{isTime ? "s" : " reps"} por set
      </div>
      {sets.map((s, i) => (
        <div key={i} className="row" style={{ marginTop: 10 }}>
          <span className="pill" style={{ minWidth: 54, textAlign: "center" }}>Set {i + 1}</span>
          <label className="field grow">
            <span className="lbl">{isTime ? "Segundos" : "Reps"}</span>
            <input
              type="number" inputMode="numeric"
              value={isTime ? s.seconds ?? "" : s.reps ?? ""}
              onChange={(e) => update(i, isTime ? { seconds: +e.target.value } : { reps: +e.target.value })}
            />
          </label>
          {!isTime && (
            <label className="field" style={{ width: 110 }}>
              <span className="lbl">Peso (kg)</span>
              <input type="number" inputMode="decimal" value={s.weight ?? 0}
                onChange={(e) => update(i, { weight: +e.target.value })} />
            </label>
          )}
        </div>
      ))}
      <RestTimer seconds={ex.rest} />

      <div className="muted tiny" style={{ marginTop: 10 }}>
        💥 Lleva cada set <strong>cerca del fallo (RIR 0-2)</strong>. Cumple el objetivo en todos los sets 2 sesiones
        seguidas y se desbloquea el siguiente nivel automáticamente.
      </div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={save}>Guardar serie</button>
    </Sheet>
  );
}

function CompleteDayButton({ dayKey }: { dayKey: string }) {
  const completedDays = useStore((s) => s.completedDays);
  const markDayComplete = useStore((s) => s.markDayComplete);
  const toast = useToast((s) => s.show);
  const done = completedDays[`${dateKey()}:${dayKey}`];

  if (done) {
    return (
      <div className="card center" style={{ borderColor: "var(--green)", color: "var(--green)" }}>
        <CheckCircle2 size={22} /> <div style={{ fontWeight: 700, marginTop: 4 }}>¡Entreno de hoy completado!</div>
      </div>
    );
  }
  return (
    <button className="btn btn-primary btn-block" style={{ marginTop: 4 }}
      onClick={() => { markDayComplete(dayKey); toast("¡Día completado! 🔥", "success"); }}>
      <CheckCircle2 size={18} /> Marcar entreno como completado
    </button>
  );
}
