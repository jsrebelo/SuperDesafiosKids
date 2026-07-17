import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { bootstrapStorage } from "./infrastructure/storage/StorageBootstrap";
import "./shared/styles/global.css";
import "./shared/styles/math.css";
import "./shared/styles/navigation.css";
import "./shared/styles/rewards.css";
import "./shared/styles/words.css";
import "./shared/styles/parents.css";
import "./shared/styles/accessibility.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento root não encontrado.");
}

void bootstrapStorage()
  .then(() => {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  })
  .catch(() => {
    rootElement.innerHTML = `
      <main style="font-family: sans-serif; padding: 2rem;">
        <h1>Não foi possível iniciar a aplicação</h1>
        <p>O teu progresso não foi alterado. Fecha e volta a abrir a aplicação.</p>
      </main>
    `;
  });
