import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Tipografías de marca Savia: Poppins (titulares) + Inter (cuerpo).
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./styles/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
