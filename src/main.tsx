import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./shared/styles/global.css";
import "./shared/styles/math.css";
import "./shared/styles/rewards.css";
import "./shared/styles/words.css";
import "./shared/styles/parents.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
