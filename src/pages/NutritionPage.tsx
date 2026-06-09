import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Trash2, Search, Camera, X, Sparkles, ChevronLeft, ChevronRight, Droplet, Minus } from "lucide-react";
import { Header } from "../components/Header";
import { Sheet } from "../components/Sheet";
import { MacroRing, MacroBar } from "../components/MacroRing";
import { useToast } from "../components/Toast";
import { useStore, type Meal } from "../store/useStore";
import { FOODS, CATEGORIES, type Food } from "../data/foods";
import { dateKey, prettyDate } from "../lib/date";
import { sumEntries, scale } from "../lib/totals";
import { identifyFood, fileToBase64, type AIFoodResult } from "../lib/gemini";

const MEALS: Meal[] = ["Desayuno", "Almuerzo", "Once", "Cena", "Snack"];

export function NutritionPage() {
  const [params, setParams] = useSearchParams();
  const [offset, setOffset] = useState(0); // días respecto a hoy
  const date = useMemo(() => {
    const d = new Date(); d.setDate(d.getDate() + offset); return dateKey(d);
  }, [offset]);

  const diary = useStore((s) => s.diary);
  const removeFood = useStore((s) => s.removeFood);
  const targets = useStore((s) => s.targets)();
  const entries = diary[date] ?? [];
  const totals = sumEntries(entries);

  const [addOpen, setAddOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  useEffect(() => {
    if (params.get("ai") === "1") { setAiOpen(true); params.delete("ai"); setParams(params, { replace: true }); }
  }, [params, setParams]);

  return (
    <section className="fade">
      <Header title="Nutrición" sub="Balance diario de macros" />

      <div className="card">
        <div className="row between" style={{ marginBottom: 6 }}>
          <button className="iconbtn" onClick={() => setOffset((o) => o - 1)}><ChevronLeft size={18} /></button>
          <div className="center">
            <div style={{ fontWeight: 700, textTransform: "capitalize" }}>
              {offset === 0 ? "Hoy" : prettyDate(date)}
            </div>
            {offset !== 0 && <div className="muted tiny">{offset > 0 ? `+${offset}` : offset} días</div>}
          </div>
          <button className="iconbtn" onClick={() => setOffset((o) => Math.min(0, o + 1))} disabled={offset >= 0}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="row" style={{ gap: 18 }}>
          <MacroRing value={totals.kcal} max={targets.kcal} />
          <div className="grow">
            <MacroBar label="Proteína" value={totals.p} target={targets.protein} color="var(--m-prot)" />
            <MacroBar label="Carbos" value={totals.c} target={targets.carbs} color="var(--m-carb)" />
            <MacroBar label="Grasa" value={totals.f} target={targets.fat} color="var(--m-fat)" />
            <div className="tiny muted" style={{ marginTop: 8 }}>
              Restan <strong style={{ color: "var(--green)" }}>{Math.max(0, targets.kcal - totals.kcal)}</strong> kcal
            </div>
          </div>
        </div>
      </div>

      <WaterCard date={date} target={targets.waterMl} fiber={targets.fiber} />

      <div className="grid2" style={{ marginBottom: 4 }}>
        <button className="btn btn-primary btn-block" onClick={() => setAddOpen(true)}><Plus size={18} /> Agregar</button>
        <button className="btn btn-ghost btn-block" onClick={() => setAiOpen(true)}><Camera size={18} /> Escanear IA</button>
      </div>

      {MEALS.map((meal) => {
        const items = entries.filter((e) => e.meal === meal);
        if (items.length === 0) return null;
        const t = sumEntries(items);
        return (
          <div key={meal} className="card">
            <div className="row between">
              <h3 style={{ margin: 0 }}>{meal}</h3>
              <span className="tiny muted">{Math.round(t.kcal)} kcal</span>
            </div>
            {items.map((e) => (
              <div key={e.id} className="list-item" style={{ marginTop: 8 }}>
                <div className="grow">
                  <div>{e.name}</div>
                  <div className="muted tiny">
                    {e.grams} g · {e.kcal} kcal · P{e.p} C{e.c} G{e.f}
                  </div>
                </div>
                <button className="iconbtn" onClick={() => removeFood(date, e.id)} aria-label="Eliminar">
                  <Trash2 size={16} color="var(--red)" />
                </button>
              </div>
            ))}
          </div>
        );
      })}

      {entries.length === 0 && (
        <div className="card center muted">
          <p>Aún no registras comidas hoy.<br />Toca <strong>Agregar</strong> o usa la cámara con IA 📷</p>
        </div>
      )}

      {addOpen && <AddFoodSheet date={date} onClose={() => setAddOpen(false)} />}
      {aiOpen && <AISheet date={date} onClose={() => setAiOpen(false)} />}
    </section>
  );
}

function WaterCard({ date, target, fiber }: { date: string; target: number; fiber: number }) {
  const water = useStore((s) => s.water[date] ?? 0);
  const addWater = useStore((s) => s.addWater);
  const pct = target > 0 ? Math.min((water / target) * 100, 100) : 0;
  return (
    <div className="card">
      <div className="row between">
        <h3 style={{ margin: 0, display: "flex", gap: 6, alignItems: "center" }}>
          <Droplet size={16} color="var(--sapphire)" /> Agua
        </h3>
        <span className="tiny muted">{(water / 1000).toFixed(2)} / {(target / 1000).toFixed(1)} L</span>
      </div>
      <div className="bar" style={{ marginTop: 8 }}>
        <span style={{ width: `${pct}%`, background: "var(--sapphire)" }} />
      </div>
      <div className="row" style={{ gap: 8, marginTop: 10 }}>
        <button className="btn btn-ghost btn-sm grow" onClick={() => addWater(date, 250)}>+ Vaso 250 ml</button>
        <button className="btn btn-ghost btn-sm grow" onClick={() => addWater(date, 500)}>+ Botella 500 ml</button>
        {water > 0 && <button className="iconbtn" onClick={() => addWater(date, -250)} aria-label="Quitar"><Minus size={16} /></button>}
      </div>
      <div className="tiny muted center" style={{ marginTop: 8 }}>Meta fibra ≈ {fiber} g/día</div>
    </div>
  );
}

function AddFoodSheet({ date, onClose }: { date: string; onClose: () => void }) {
  const customFoods = useStore((s) => s.customFoods);
  const removeCustomFood = useStore((s) => s.removeCustomFood);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Todas");
  const [picked, setPicked] = useState<Food | null>(null);
  const [custom, setCustom] = useState(false);

  const results = useMemo(() => {
    const nq = q.trim().toLowerCase();
    const all: Food[] = cat === "★ Míos" ? customFoods : [...customFoods, ...FOODS];
    return all.filter((f) =>
      (cat === "Todas" || cat === "★ Míos" || f.category === cat) &&
      (nq === "" || f.name.toLowerCase().includes(nq))
    ).slice(0, 120);
  }, [q, cat, customFoods]);

  if (custom) return <CustomFoodSheet date={date} onBack={() => setCustom(false)} onDone={onClose} />;
  if (picked) return <PortionSheet food={picked} date={date} onBack={() => setPicked(null)} onDone={onClose} />;

  const isMine = (id: string) => id.startsWith("custom-");

  return (
    <Sheet open onClose={onClose}>
      <div className="row between">
        <h2 style={{ margin: 0 }}>Agregar alimento</h2>
        <button className="btn btn-ghost btn-sm" onClick={() => setCustom(true)}>+ Personalizado</button>
      </div>
      <div className="row" style={{ margin: "10px 0" }}>
        <Search size={18} className="muted" />
        <input autoFocus placeholder="Buscar (marraqueta, palta, completo…)" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="chips" style={{ marginBottom: 10 }}>
        {["Todas", ...(customFoods.length ? ["★ Míos"] : []), ...CATEGORIES].map((c) => (
          <button key={c} className={`chip ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div style={{ maxHeight: "48vh", overflowY: "auto" }}>
        {results.map((f) => (
          <div key={f.id} className="list-item" style={{ width: "100%" }}>
            <button className="grow" style={{ background: "transparent", padding: 0, textAlign: "left" }} onClick={() => setPicked(f)}>
              <div>{f.name} {isMine(f.id) && <span className="pill mauve" style={{ fontSize: "0.6rem" }}>mío</span>}</div>
              <div className="muted tiny">{f.category} · {f.kcal} kcal/100g</div>
            </button>
            {isMine(f.id)
              ? <button className="iconbtn" onClick={() => removeCustomFood(f.id)} aria-label="Eliminar"><Trash2 size={15} color="var(--red)" /></button>
              : <Plus size={18} color="var(--mauve)" onClick={() => setPicked(f)} />}
          </div>
        ))}
        {results.length === 0 && <p className="muted center">Sin resultados. Prueba otra búsqueda o crea uno con “+ Personalizado”.</p>}
      </div>
    </Sheet>
  );
}

function PortionSheet({ food, date, onBack, onDone }: { food: Food; date: string; onBack: () => void; onDone: () => void }) {
  const addFood = useStore((s) => s.addFood);
  const toast = useToast((s) => s.show);
  const [grams, setGrams] = useState(food.portion);
  const [meal, setMeal] = useState<Meal>("Almuerzo");
  const m = scale(food, grams);

  const add = () => {
    addFood(date, { foodId: food.id, name: food.name, grams, kcal: m.kcal, p: m.p, c: m.c, f: m.f, meal });
    toast(`${food.name} agregado ✅`, "success");
    onDone();
  };

  return (
    <Sheet open onClose={onBack}>
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 10 }}><ChevronLeft size={16} /> Volver</button>
      <h2>{food.name}</h2>
      <div className="muted tiny">{food.kcal} kcal / 100 g · porción típica: {food.portionLabel} ({food.portion} g)</div>

      <label className="field" style={{ marginTop: 14 }}>
        <span className="lbl">Cantidad (gramos)</span>
        <input type="number" inputMode="numeric" value={grams} onChange={(e) => setGrams(Math.max(0, +e.target.value))} />
      </label>
      <div className="chips" style={{ marginTop: 8 }}>
        {[0.5, 1, 1.5, 2].map((mult) => (
          <button key={mult} className="chip" onClick={() => setGrams(Math.round(food.portion * mult))}>
            {mult}× porción
          </button>
        ))}
      </div>

      <label className="field" style={{ marginTop: 12 }}>
        <span className="lbl">Comida</span>
        <select value={meal} onChange={(e) => setMeal(e.target.value as Meal)}>
          {MEALS.map((mm) => <option key={mm} value={mm}>{mm}</option>)}
        </select>
      </label>

      <div className="grid2" style={{ marginTop: 14 }}>
        <div className="stat"><div className="v" style={{ color: "var(--m-kcal)" }}>{m.kcal}</div><div className="k">kcal</div></div>
        <div className="stat"><div className="v" style={{ color: "var(--m-prot)" }}>{m.p}</div><div className="k">Proteína</div></div>
        <div className="stat"><div className="v" style={{ color: "var(--m-carb)" }}>{m.c}</div><div className="k">Carbos</div></div>
        <div className="stat"><div className="v" style={{ color: "var(--m-fat)" }}>{m.f}</div><div className="k">Grasa</div></div>
      </div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 14 }} onClick={add}>Agregar al diario</button>
    </Sheet>
  );
}

function CustomFoodSheet({ date, onBack, onDone }: { date: string; onBack: () => void; onDone: () => void }) {
  const addFood = useStore((s) => s.addFood);
  const toast = useToast((s) => s.show);
  const [name, setName] = useState("");
  const [grams, setGrams] = useState(100);
  const [kcal, setKcal] = useState(0);
  const [p, setP] = useState(0);
  const [c, setC] = useState(0);
  const [f, setF] = useState(0);
  const [meal, setMeal] = useState<Meal>("Snack");

  // Si no ponen kcal, se estiman desde los macros (4/4/9).
  const kcalCalc = kcal > 0 ? kcal : Math.round(p * 4 + c * 4 + f * 9);

  const add = () => {
    if (!name.trim()) { toast("Ponle un nombre al alimento"); return; }
    addFood(date, { name: name.trim(), grams, kcal: kcalCalc, p, c, f, meal });
    toast(`${name.trim()} agregado ✅`, "success");
    onDone();
  };

  return (
    <Sheet open onClose={onBack}>
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 10 }}><ChevronLeft size={16} /> Volver</button>
      <h2>Alimento / suplemento personalizado</h2>
      <p className="tiny muted">Ingresa los valores de la porción que consumiste (mira la etiqueta del producto).</p>

      <label className="field" style={{ marginTop: 8 }}><span className="lbl">Nombre</span>
        <input autoFocus placeholder="Ej: Ostrovit choco 2 scoops" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div className="grid2" style={{ marginTop: 10 }}>
        <label className="field"><span className="lbl">Cantidad (g)</span>
          <input type="number" inputMode="numeric" value={grams} onChange={(e) => setGrams(+e.target.value)} />
        </label>
        <label className="field"><span className="lbl">Calorías (kcal)</span>
          <input type="number" inputMode="numeric" placeholder="auto" value={kcal || ""} onChange={(e) => setKcal(+e.target.value)} />
        </label>
        <label className="field"><span className="lbl">Proteína (g)</span>
          <input type="number" inputMode="decimal" value={p || ""} onChange={(e) => setP(+e.target.value)} />
        </label>
        <label className="field"><span className="lbl">Carbos (g)</span>
          <input type="number" inputMode="decimal" value={c || ""} onChange={(e) => setC(+e.target.value)} />
        </label>
        <label className="field"><span className="lbl">Grasa (g)</span>
          <input type="number" inputMode="decimal" value={f || ""} onChange={(e) => setF(+e.target.value)} />
        </label>
        <label className="field"><span className="lbl">Comida</span>
          <select value={meal} onChange={(e) => setMeal(e.target.value as Meal)}>
            {MEALS.map((mm) => <option key={mm} value={mm}>{mm}</option>)}
          </select>
        </label>
      </div>
      <div className="tiny muted center" style={{ marginTop: 10 }}>
        Total: <strong style={{ color: "var(--peach)" }}>{kcalCalc} kcal</strong> · P{p} C{c} G{f}
      </div>
      <button className="btn btn-primary btn-block" style={{ marginTop: 12 }} onClick={add}>Agregar al diario</button>
    </Sheet>
  );
}

function AISheet({ date, onClose }: { date: string; onClose: () => void }) {
  const apiKey = useStore((s) => s.apiKey);
  const addFood = useStore((s) => s.addFood);
  const addCustomFood = useStore((s) => s.addCustomFood);
  const toast = useToast((s) => s.show);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIFoodResult | null>(null);
  const [meal, setMeal] = useState<Meal>("Almuerzo");
  const [grams, setGrams] = useState(0);
  const [saveDb, setSaveDb] = useState(true);

  const onPick = async (file: File) => {
    setError(null); setResult(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const { data, mime } = await fileToBase64(file);
      const r = await identifyFood(data, apiKey, mime);
      setResult(r);
      setGrams(r.grams);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  // Macros escalados a la cantidad ajustada por el usuario.
  const baseG = result?.grams || 1;
  const sc = (v: number) => Math.round((v * grams) / baseG);
  const scd = (v: number) => Math.round(((v * grams) / baseG) * 10) / 10;

  const add = () => {
    if (!result) return;
    const macros = { kcal: sc(result.kcal), p: scd(result.protein), c: scd(result.carbs), f: scd(result.fat) };
    if (saveDb && grams > 0) {
      // Guarda una entrada reutilizable (valores por 100 g) en la base del usuario.
      const k = 100 / grams;
      addCustomFood({
        name: result.name,
        category: "Platos globales",
        kcal: Math.round(macros.kcal * k),
        p: Math.round(macros.p * k * 10) / 10,
        c: Math.round(macros.c * k * 10) / 10,
        f: Math.round(macros.f * k * 10) / 10,
        portion: grams,
        portionLabel: "porción IA",
        source: "ia",
      });
    }
    addFood(date, { name: `${result.name} (IA)`, grams, ...macros, meal });
    toast(saveDb ? "Agregado y guardado en tu base ✅" : "Alimento de IA agregado ✅", "success");
    onClose();
  };

  return (
    <Sheet open onClose={onClose}>
      <div className="row between">
        <h2 style={{ display: "flex", gap: 8, alignItems: "center" }}><Sparkles size={18} color="var(--mauve)" /> Identificar con IA</h2>
        <button className="iconbtn" onClick={onClose}><X size={18} /></button>
      </div>

      {!apiKey && (
        <div className="card" style={{ borderColor: "var(--peach)", marginBottom: 10 }}>
          <div className="tiny">⚠️ Necesitas una API key de Gemini (gratis). Configúrala en <strong>Ajustes → IA</strong>.</div>
        </div>
      )}

      <label className="btn btn-primary btn-block" style={{ marginTop: 6 }}>
        <Camera size={18} /> Tomar / elegir foto
        <input type="file" accept="image/*" capture="environment" style={{ display: "none" }}
          onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])} />
      </label>

      {preview && <img src={preview} alt="comida" style={{ width: "100%", borderRadius: 14, marginTop: 12 }} />}

      {loading && <p className="center muted" style={{ marginTop: 12 }}>🔍 Analizando con Gemini…</p>}
      {error && <p className="tiny" style={{ color: "var(--red)", marginTop: 10 }}>❌ {error}</p>}

      {result && (
        <>
          <div className="card" style={{ marginTop: 12 }}>
            <div className="row between">
              <strong>{result.name}</strong>
              <span className="pill mauve">{Math.round(result.confidence * 100)}% seguro</span>
            </div>
            {result.notes && <div className="muted tiny">{result.notes}</div>}
            <div className="row" style={{ gap: 10, marginTop: 10 }}>
              <label className="field grow">
                <span className="lbl">Cantidad estimada (g) — ajústala</span>
                <input type="number" inputMode="numeric" value={grams} onChange={(e) => setGrams(Math.max(0, +e.target.value))} />
              </label>
              <label className="field" style={{ width: 130 }}>
                <span className="lbl">Comida</span>
                <select value={meal} onChange={(e) => setMeal(e.target.value as Meal)}>
                  {MEALS.map((mm) => <option key={mm} value={mm}>{mm}</option>)}
                </select>
              </label>
            </div>
            <div className="grid2" style={{ marginTop: 10 }}>
              <div className="stat"><div className="v" style={{ color: "var(--m-kcal)" }}>{sc(result.kcal)}</div><div className="k">kcal</div></div>
              <div className="stat"><div className="v" style={{ color: "var(--m-prot)" }}>{scd(result.protein)}</div><div className="k">Proteína</div></div>
              <div className="stat"><div className="v" style={{ color: "var(--m-carb)" }}>{scd(result.carbs)}</div><div className="k">Carbos</div></div>
              <div className="stat"><div className="v" style={{ color: "var(--m-fat)" }}>{scd(result.fat)}</div><div className="k">Grasa</div></div>
            </div>
          </div>

          <label className="list-item" style={{ marginTop: 10, cursor: "pointer" }}>
            <input type="checkbox" style={{ width: 18, height: 18 }} checked={saveDb} onChange={(e) => setSaveDb(e.target.checked)} />
            <div className="grow tiny">Guardar en mi base de datos para reutilizarlo después</div>
          </label>

          <button className="btn btn-primary btn-block" style={{ marginTop: 12 }} onClick={add}>Agregar al diario</button>
        </>
      )}
    </Sheet>
  );
}
