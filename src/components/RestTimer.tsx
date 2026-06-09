import { useEffect, useRef, useState } from "react";
import { Timer, Play, RotateCcw, X } from "lucide-react";

// Temporizador de descanso entre series.
export function RestTimer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState<number | null>(null);
  const ref = useRef<number | null>(null);

  useEffect(() => () => { if (ref.current) clearInterval(ref.current); }, []);

  const start = (s: number) => {
    if (ref.current) clearInterval(ref.current);
    setLeft(s);
    ref.current = window.setInterval(() => {
      setLeft((v) => {
        if (v === null) return null;
        if (v <= 1) {
          if (ref.current) clearInterval(ref.current);
          try { navigator.vibrate?.(200); } catch { /* noop */ }
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  };

  const stop = () => { if (ref.current) clearInterval(ref.current); setLeft(null); };

  if (left === null) {
    return (
      <button className="btn btn-ghost btn-block" onClick={() => start(seconds)} style={{ marginTop: 10 }}>
        <Timer size={16} /> Descanso {seconds}s
      </button>
    );
  }

  const mm = Math.floor(left / 60), ss = left % 60;
  return (
    <div className="row" style={{ marginTop: 10, gap: 8 }}>
      <div className="grow center" style={{
        fontVariantNumeric: "tabular-nums", fontSize: "1.6rem", fontWeight: 800,
        color: left === 0 ? "var(--green)" : "var(--mauve)",
      }}>
        {left === 0 ? "¡Listo! 💪" : `${mm}:${String(ss).padStart(2, "0")}`}
      </div>
      <button className="iconbtn" onClick={() => start(seconds)} aria-label="Reiniciar"><RotateCcw size={16} /></button>
      <button className="iconbtn" onClick={() => start(left + 15)} aria-label="+15s"><Play size={16} /></button>
      <button className="iconbtn" onClick={stop} aria-label="Cerrar"><X size={16} /></button>
    </div>
  );
}
