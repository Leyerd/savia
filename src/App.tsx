import { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "./components/BottomNav";
import { ToastHost } from "./components/Toast";
import { useStore } from "./store/useStore";
import { Home } from "./pages/Home";
import { RoutinePage } from "./pages/RoutinePage";
import { NutritionPage } from "./pages/NutritionPage";
import { ProgressPage } from "./pages/ProgressPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  const theme = useStore((s) => s.theme);
  const bg = useStore((s) => s.bg);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.bg = bg;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const base = getComputedStyle(document.documentElement).getPropertyValue("--base").trim();
      if (base) meta.setAttribute("content", base);
    }
  }, [theme, bg]);

  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rutina" element={<RoutinePage />} />
          <Route path="/nutricion" element={<NutritionPage />} />
          <Route path="/progreso" element={<ProgressPage />} />
          <Route path="/ajustes" element={<SettingsPage />} />
        </Routes>
      </div>
      <BottomNav />
      <ToastHost />
    </HashRouter>
  );
}
