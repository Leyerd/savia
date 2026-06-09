import { useState } from "react";
import { Header } from "../components/Header";
import { useToast } from "../components/Toast";
import { useStore } from "../store/useStore";
import { useRef } from "react";
import { computeTargets, estimateBodyFat, resolvePlan, type Activity, type Goal, type Profile, type Sex } from "../lib/macros";
import { Save, KeyRound, User, ExternalLink, Scale, Trash2, Target, Palette, Download, Upload, Flame, Activity as ActivityIcon } from "lucide-react";
import { prettyDate } from "../lib/date";

const THEMES = [
  { id: "savia", name: "Savia 🌿", c: "#157A4E" },
  { id: "mocha", name: "Mocha", c: "#cba6f7" },
  { id: "macchiato", name: "Macchiato", c: "#c6a0f6" },
  { id: "frappe", name: "Frappé", c: "#ca9ee6" },
  { id: "latte", name: "Latte ☀️", c: "#8839ef" },
  { id: "amoled", name: "AMOLED", c: "#000000" },
];
const BACKGROUNDS = [
  { id: "aurora", name: "Aurora" },
  { id: "mesh", name: "Malla" },
  { id: "sunset", name: "Atardecer" },
  { id: "ocean", name: "Océano" },
  { id: "grid", name: "Cuadrícula" },
  { id: "solid", name: "Sólido" },
];

export function SettingsPage() {
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const apiKey = useStore((s) => s.apiKey);
  const setApiKey = useStore((s) => s.setApiKey);
  const toast = useToast((s) => s.show);

  const [form, setForm] = useState<Profile>(profile);
  const [key, setKey] = useState(apiKey);
  const targets = computeTargets(form);

  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => { setProfile(form); toast("Perfil guardado ✅", "success"); };
  const saveKey = () => { setApiKey(key.trim()); toast("API key guardada ✅", "success"); };

  return (
    <section className="fade">
      <Header title="Ajustes" sub="Perfil, metas, apariencia e IA" />

      <AppearanceCard />

      <div className="card">
        <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><User size={18} color="var(--mauve)" /> Perfil</h2>
        <label className="field"><span className="lbl">Nombre</span>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <div className="grid2" style={{ marginTop: 10 }}>
          <label className="field"><span className="lbl">Edad</span>
            <input type="number" value={form.age} onChange={(e) => set("age", +e.target.value)} />
          </label>
          <label className="field"><span className="lbl">Sexo</span>
            <select value={form.sex} onChange={(e) => set("sex", e.target.value as Sex)}>
              <option value="m">Hombre</option><option value="f">Mujer</option>
            </select>
          </label>
          <label className="field"><span className="lbl">Altura (cm)</span>
            <input type="number" value={form.heightCm} onChange={(e) => set("heightCm", +e.target.value)} />
          </label>
          <label className="field"><span className="lbl">Peso (kg)</span>
            <input type="number" value={form.weightKg} onChange={(e) => set("weightKg", +e.target.value)} />
          </label>
        </div>
        <label className="field" style={{ marginTop: 10 }}><span className="lbl">Actividad</span>
          <select value={form.activity} onChange={(e) => set("activity", e.target.value as Activity)}>
            <option value="sedentario">Sedentario</option>
            <option value="ligero">Ligero (1–3 días)</option>
            <option value="moderado">Moderado (3–5 días)</option>
            <option value="activo">Activo (6–7 días)</option>
            <option value="muy_activo">Muy activo</option>
          </select>
        </label>
        <label className="field" style={{ marginTop: 10 }}><span className="lbl">Objetivo</span>
          <select value={form.goal} onChange={(e) => set("goal", e.target.value as Goal)}>
            <option value="sixpack">🎯 Sixpack (automático)</option>
            <option value="deficit">Definir / bajar grasa</option>
            <option value="mantener">Mantener</option>
            <option value="volumen">Ganar músculo</option>
          </select>
        </label>

        {form.goal === "sixpack" && (
          <>
            <div className="tiny muted" style={{ margin: "10px 2px 4px" }}>
              Para decidir tu plan automáticamente medimos tu % de grasa. Mide con una huincha
              (opcional pero más preciso); sin estos datos se estima con tu IMC.
            </div>
            <div className="grid2">
              <label className="field"><span className="lbl">Cintura (cm)</span>
                <input type="number" inputMode="decimal" placeholder="ombligo"
                  value={form.waistCm ?? ""} onChange={(e) => set("waistCm", e.target.value ? +e.target.value : undefined)} />
              </label>
              <label className="field"><span className="lbl">Cuello (cm)</span>
                <input type="number" inputMode="decimal" placeholder="bajo la nuez"
                  value={form.neckCm ?? ""} onChange={(e) => set("neckCm", e.target.value ? +e.target.value : undefined)} />
              </label>
              {form.sex === "f" && (
                <label className="field"><span className="lbl">Cadera (cm)</span>
                  <input type="number" inputMode="decimal"
                    value={form.hipCm ?? ""} onChange={(e) => set("hipCm", e.target.value ? +e.target.value : undefined)} />
                </label>
              )}
            </div>
          </>
        )}

        <PlanBox profile={form} />


        <div className="grid2" style={{ marginTop: 14 }}>
          <div className="stat"><div className="v" style={{ color: "var(--m-kcal)" }}>{targets.kcal}</div><div className="k">kcal meta</div></div>
          <div className="stat"><div className="v" style={{ color: "var(--m-prot)" }}>{targets.protein}g</div><div className="k">Proteína</div></div>
          <div className="stat"><div className="v" style={{ color: "var(--m-carb)" }}>{targets.carbs}g</div><div className="k">Carbos</div></div>
          <div className="stat"><div className="v" style={{ color: "var(--m-fat)" }}>{targets.fat}g</div><div className="k">Grasa</div></div>
        </div>
        <div className="tiny muted center" style={{ marginTop: 8 }}>TMB {targets.bmr} · Gasto total {targets.tdee} kcal/día</div>
        <div className="tiny muted center">Masa magra ~{targets.ffm} kg · Fibra {targets.fiber} g · Agua {(targets.waterMl / 1000).toFixed(1)} L</div>

        <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={save}><Save size={18} /> Guardar perfil</button>
      </div>

      <WeightCard />

      <AdaptiveCard />

      <BridgeCard />

      <div className="card">
        <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><KeyRound size={18} color="var(--sapphire)" /> IA · Gemini (gratis)</h2>
        <p className="tiny muted">
          La identificación de alimentos por foto usa la API gratuita de Google Gemini.
          Crea tu key con tu cuenta de Google y pégala aquí. Se guarda solo en este dispositivo.
        </p>
        <a className="btn btn-ghost btn-sm" href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", gap: 6, marginBottom: 10 }}>
          Obtener API key <ExternalLink size={14} />
        </a>
        <label className="field"><span className="lbl">API key</span>
          <input type="password" placeholder="AIza…" value={key} onChange={(e) => setKey(e.target.value)} />
        </label>
        <button className="btn btn-primary btn-block" style={{ marginTop: 12 }} onClick={saveKey}><Save size={18} /> Guardar API key</button>
      </div>

      <DataCard />

      <div className="card center tiny muted">
        Savia v1.0 · Lo que comes alimenta lo que entrenas 🌿
      </div>
    </section>
  );
}

function AppearanceCard() {
  const theme = useStore((s) => s.theme);
  const bg = useStore((s) => s.bg);
  const setTheme = useStore((s) => s.setTheme);
  const setBg = useStore((s) => s.setBg);
  return (
    <div className="card">
      <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Palette size={18} color="var(--pink)" /> Apariencia</h2>
      <h3 style={{ marginBottom: 6 }}>Tema</h3>
      <div className="chips">
        {THEMES.map((t) => (
          <button key={t.id} className={`chip ${theme === t.id ? "active" : ""}`} onClick={() => setTheme(t.id)}>
            <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 99, background: t.c, marginRight: 6, border: "1px solid var(--border)" }} />
            {t.name}
          </button>
        ))}
      </div>
      <h3 style={{ margin: "12px 0 6px" }}>Fondo</h3>
      <div className="chips">
        {BACKGROUNDS.map((b) => (
          <button key={b.id} className={`chip ${bg === b.id ? "active" : ""}`} onClick={() => setBg(b.id)}>{b.name}</button>
        ))}
      </div>
    </div>
  );
}

function DataCard() {
  const exportData = useStore((s) => s.exportData);
  const importData = useStore((s) => s.importData);
  const toast = useToast((s) => s.show);
  const fileRef = useRef<HTMLInputElement>(null);

  const doExport = () => {
    const blob = new Blob([exportData()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `savia-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast("Respaldo exportado ✅", "success");
  };

  const doImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importData(String(reader.result));
      toast(ok ? "Datos importados ✅" : "Archivo inválido", ok ? "success" : "default");
    };
    reader.readAsText(file);
  };

  return (
    <div className="card">
      <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Download size={18} color="var(--teal)" /> Copia de seguridad</h2>
      <p className="tiny muted">Tus datos se guardan solo en este dispositivo. Expórtalos para respaldar o pasar de PC a celular.</p>
      <div className="grid2">
        <button className="btn btn-ghost btn-block" onClick={doExport}><Download size={16} /> Exportar</button>
        <button className="btn btn-ghost btn-block" onClick={() => fileRef.current?.click()}><Upload size={16} /> Importar</button>
      </div>
      <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
    </div>
  );
}

function AdaptiveCard() {
  const adaptive = useStore((s) => s.adaptive);
  const setAdaptive = useStore((s) => s.setAdaptive);
  const profile = useStore((s) => s.profile);
  const m = useStore((s) => s.measuredTdee)();
  const theoretical = computeTargets(profile).tdee;
  const confColor = m?.confidence === "alta" ? "var(--green)" : m?.confidence === "media" ? "var(--peach)" : "var(--red)";

  return (
    <div className="card">
      <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <ActivityIcon size={18} color="var(--green)" /> Gasto real (TDEE adaptativo)
      </h2>
      <label className="row between" style={{ gap: 12, cursor: "pointer", alignItems: "flex-start" }}>
        <div className="grow">
          <div style={{ fontWeight: 600 }}>Ajustar mis calorías con datos reales</div>
          <p className="tiny muted" style={{ marginTop: 4 }}>
            En vez de confiar solo en una fórmula, la app deduce tu gasto real comparando
            lo que comes con cómo cambia tu peso, y recalcula tus metas.
          </p>
        </div>
        <input
          type="checkbox"
          checked={adaptive}
          onChange={(e) => setAdaptive(e.target.checked)}
          style={{ width: 22, height: 22, accentColor: "var(--green)", marginTop: 2 }}
        />
      </label>

      {m ? (
        <>
          <div className="grid3" style={{ marginTop: 12 }}>
            <div className="stat"><div className="v" style={{ color: "var(--m-kcal)" }}>{m.tdee}</div><div className="k">Gasto real</div></div>
            <div className="stat"><div className="v">{theoretical}</div><div className="k">Teórico</div></div>
            <div className="stat"><div className="v" style={{ color: confColor }}>{m.confidence}</div><div className="k">Confianza</div></div>
          </div>
          <div className="tiny muted" style={{ marginTop: 8 }}>
            Basado en {m.loggedDays} días con registro y {m.spanDays} días entre pesajes
            ({m.weightChangeKg > 0 ? "+" : ""}{m.weightChangeKg} kg · ingesta media {m.meanIntake} kcal).
            {m.confidence === "baja" && " Registra con más constancia para mejorar la precisión."}
          </div>
        </>
      ) : (
        <div className="tiny muted" style={{ marginTop: 10 }}>
          Aún no hay datos suficientes. Necesitas <strong>≥2 pesajes</strong> separados al menos
          una semana y <strong>≥7 días</strong> con comida registrada. Mientras tanto se usa la
          estimación teórica ({theoretical} kcal).
        </div>
      )}
    </div>
  );
}

function BridgeCard() {
  const eatBack = useStore((s) => s.eatBack);
  const setEatBack = useStore((s) => s.setEatBack);
  const activity = useStore((s) => s.profile.activity);
  const lowActivity = activity === "sedentario" || activity === "ligero";

  return (
    <div className="card">
      <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Flame size={18} color="var(--peach)" /> Puente nutrición ⟷ ejercicio
      </h2>
      <label className="row between" style={{ gap: 12, cursor: "pointer", alignItems: "flex-start" }}>
        <div className="grow">
          <div style={{ fontWeight: 600 }}>Sumar el entreno al objetivo del día</div>
          <p className="tiny muted" style={{ marginTop: 4 }}>
            Cuando registras un entreno, las calorías quemadas se añaden a tu meta de ese día
            (presupuesto dinámico: entrenas más → comes más).
          </p>
        </div>
        <input
          type="checkbox"
          checked={eatBack}
          onChange={(e) => setEatBack(e.target.checked)}
          style={{ width: 22, height: 22, accentColor: "var(--green)", marginTop: 2 }}
        />
      </label>

      <div className="tiny muted" style={{ marginTop: 6 }}>
        {eatBack && !lowActivity ? (
          <span style={{ color: "var(--peach)" }}>
            ⚠️ Tu factor de actividad ({activity}) ya incluye entrenar. Para no contar doble,
            ponlo en <strong>Sedentario o Ligero</strong> y deja que el entreno sume el resto.
          </span>
        ) : (
          <>
            Por defecto está <strong>desactivado</strong>: tu gasto total (TDEE) ya asume tu nivel
            de actividad, así que el entreno se muestra como balance informativo. Actívalo solo si
            pusiste tu actividad en Sedentario/Ligero (modelo NEAT + entreno).
          </>
        )}
      </div>
    </div>
  );
}

function PlanBox({ profile }: { profile: Profile }) {
  const plan = resolvePlan(profile);
  const bf = profile.goal === "sixpack" ? estimateBodyFat(profile) : null;
  return (
    <div className="card" style={{ marginTop: 12, borderColor: "rgba(203,166,247,0.35)" }}>
      <div className="row between">
        <h3 style={{ margin: 0, display: "flex", gap: 6, alignItems: "center", color: "var(--mauve)" }}>
          <Target size={15} /> Plan determinado
        </h3>
        {bf && (
          <span className="pill mauve">
            ~{bf.bf}% grasa {bf.source === "navy" ? "(medido)" : "(estimado)"}
          </span>
        )}
      </div>
      <div style={{ fontWeight: 700, marginTop: 6 }}>{plan.title}</div>
      <div className="muted tiny" style={{ marginTop: 4 }}>{plan.rationale}</div>
    </div>
  );
}

function WeightCard() {
  const weights = useStore((s) => s.weights);
  const addWeight = useStore((s) => s.addWeight);
  const removeWeight = useStore((s) => s.removeWeight);
  const profile = useStore((s) => s.profile);
  const toast = useToast((s) => s.show);
  const [kg, setKg] = useState<string>("");

  const sorted = [...weights].sort((a, b) => b.date.localeCompare(a.date));
  const latest = sorted[0]?.kg ?? profile.weightKg;
  const first = weights[0]?.kg;
  const diff = first !== undefined ? latest - first : 0;

  const save = () => {
    const v = parseFloat(kg);
    if (!v || v <= 0) { toast("Ingresa un peso válido"); return; }
    addWeight(v);
    setKg("");
    toast("Peso registrado ✅", "success");
  };

  return (
    <div className="card">
      <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Scale size={18} color="var(--green)" /> Historial de peso</h2>
      <div className="row" style={{ gap: 10 }}>
        <label className="field grow"><span className="lbl">Peso de hoy (kg)</span>
          <input type="number" inputMode="decimal" placeholder={`${profile.weightKg}`} value={kg} onChange={(e) => setKg(e.target.value)} />
        </label>
        <button className="btn btn-primary" style={{ alignSelf: "flex-end" }} onClick={save}>Registrar</button>
      </div>

      {weights.length > 0 && (
        <>
          <div className="grid3" style={{ marginTop: 12 }}>
            <div className="stat"><div className="v">{latest}</div><div className="k">Actual (kg)</div></div>
            <div className="stat"><div className="v">{weights.length}</div><div className="k">Registros</div></div>
            <div className="stat">
              <div className="v" style={{ color: diff <= 0 ? "var(--green)" : "var(--peach)" }}>
                {diff > 0 ? "+" : ""}{diff.toFixed(1)}
              </div>
              <div className="k">Cambio (kg)</div>
            </div>
          </div>
          <div style={{ marginTop: 10, maxHeight: 180, overflowY: "auto" }}>
            {sorted.slice(0, 12).map((w) => (
              <div key={w.date} className="list-item">
                <div className="grow">
                  <div>{w.kg} kg</div>
                  <div className="muted tiny" style={{ textTransform: "capitalize" }}>{prettyDate(w.date)}</div>
                </div>
                <button className="iconbtn" onClick={() => removeWeight(w.date)} aria-label="Eliminar">
                  <Trash2 size={15} color="var(--red)" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="tiny muted center" style={{ marginTop: 8 }}>El peso más reciente actualiza tus macros automáticamente.</div>
    </div>
  );
}
