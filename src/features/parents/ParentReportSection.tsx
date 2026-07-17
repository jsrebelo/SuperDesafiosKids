import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import type { ProfileStatistics } from "../../domain/statistics/ProfileStatistics";
import type { RewardWallet } from "../../domain/rewards/RewardWallet";
import type { SkillProgress } from "../../domain/learning/Skill";
import {
  GenerateParentReport,
  openPrintableReport,
  parentReportToHtml,
} from "../../application/use-cases/GenerateParentReport";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly profile: ChildProfile;
  readonly statistics: ProfileStatistics;
  readonly wallet: RewardWallet;
  readonly progress: readonly SkillProgress[];
}

export function ParentReportSection({
  profile,
  statistics,
  wallet,
  progress,
}: Props) {
  function createReport() {
    const report = new GenerateParentReport().execute({
      profile,
      statistics,
      wallet,
      progress,
    });

    openPrintableReport(parentReportToHtml(report));
  }

  return (
    <section className="form-card">
      <h2>Relatório</h2>
      <p>
        Abre uma versão preparada para imprimir ou guardar como PDF.
      </p>
      <Button onClick={createReport}>Criar relatório</Button>
    </section>
  );
}
