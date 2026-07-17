import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { ParentReport } from "../../domain/reports/ParentReport";
import type { ProfileStatistics } from "../../domain/statistics/ProfileStatistics";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import type { SkillProgress } from "../../domain/learning/Skill";

export class GenerateParentReport {
  public execute(input: {
    profile: ChildProfile;
    statistics: ProfileStatistics;
    wallet: RewardWallet;
    progress: readonly SkillProgress[];
  }): ParentReport {
    return {
      generatedAt: new Date().toISOString(),
      profile: input.profile,
      statistics: input.statistics,
      wallet: input.wallet,
      progress: input.progress,
    };
  }
}

export function parentReportToHtml(report: ParentReport): string {
  const skillRows = report.progress
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(skillLabel(item.skillId))}</td>
          <td>${item.level}</td>
          <td>${item.attempts}</td>
          <td>${item.correctAnswers}</td>
        </tr>
      `,
    )
    .join("");

  return `
<!doctype html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8" />
  <title>Relatório — ${escapeHtml(report.profile.displayName)}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; color: #202436; }
    h1, h2 { color: #4b2ea3; }
    .metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .metric { border: 1px solid #ccd5ef; border-radius: 12px; padding: 1rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { border: 1px solid #ccd5ef; padding: 0.75rem; text-align: left; }
    .note { margin-top: 2rem; font-size: 0.9rem; color: #555; }
    @media print { button { display: none; } body { margin: 1cm; } }
  </style>
</head>
<body>
  <h1>Relatório de progresso</h1>
  <p><strong>Perfil:</strong> ${escapeHtml(report.profile.displayName)}</p>
  <p><strong>Idade:</strong> ${report.profile.age} anos</p>
  <p><strong>Gerado em:</strong> ${new Date(
    report.generatedAt,
  ).toLocaleString("pt-PT")}</p>

  <section class="metrics">
    <div class="metric">
      <strong>${report.statistics.attempts}</strong>
      <div>Tentativas</div>
    </div>
    <div class="metric">
      <strong>${Math.round(report.statistics.accuracy * 100)}%</strong>
      <div>Taxa de acerto</div>
    </div>
    <div class="metric">
      <strong>${report.wallet.xp}</strong>
      <div>XP</div>
    </div>
  </section>

  <h2>Competências</h2>
  <table>
    <thead>
      <tr>
        <th>Competência</th>
        <th>Nível</th>
        <th>Tentativas</th>
        <th>Respostas certas</th>
      </tr>
    </thead>
    <tbody>${skillRows || "<tr><td colspan='4'>Sem dados suficientes.</td></tr>"}</tbody>
  </table>

  <p class="note">
    Este relatório apresenta tendências de utilização e aprendizagem.
    Não constitui avaliação médica, psicológica ou escolar.
  </p>

  <button onclick="window.print()">Imprimir ou guardar como PDF</button>
</body>
</html>
  `.trim();
}

export function openPrintableReport(html: string): void {
  const reportWindow = window.open("", "_blank", "noopener,noreferrer");

  if (!reportWindow) {
    throw new Error("O navegador bloqueou a abertura do relatório.");
  }

  reportWindow.document.open();
  reportWindow.document.write(html);
  reportWindow.document.close();
}

function skillLabel(skillId: string): string {
  const labels: Record<string, string> = {
    "math.counting": "Contagem",
    "math.addition": "Soma",
    "math.subtraction": "Subtração",
    "math.multiplication": "Multiplicação",
    "math.division": "Divisão",
    "portuguese.missing-letter": "Letra em falta",
  };

  return labels[skillId] ?? skillId;
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}
