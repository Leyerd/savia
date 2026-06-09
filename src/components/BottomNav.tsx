import { NavLink } from "react-router-dom";
import { Home, Dumbbell, Apple, TrendingUp, Settings } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Inicio", end: true },
  { to: "/rutina", icon: Dumbbell, label: "Rutina" },
  { to: "/nutricion", icon: Apple, label: "Nutrición" },
  { to: "/progreso", icon: TrendingUp, label: "Progreso" },
  { to: "/ajustes", icon: Settings, label: "Ajustes" },
];

export function BottomNav() {
  return (
    <nav className="nav">
      {items.map(({ to, icon: Icon, label, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "active" : "")}>
          <Icon size={22} strokeWidth={2.2} />
          <span>{label}</span>
          <span className="navdot" />
        </NavLink>
      ))}
    </nav>
  );
}
