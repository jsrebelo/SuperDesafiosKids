import { useEffect, useMemo, useState } from "react";
import { ArchiveChildProfile } from "../application/use-cases/ArchiveChildProfile";
import { CreateChildProfile } from "../application/use-cases/CreateChildProfile";
import { ExportProfileData } from "../application/use-cases/ExportProfileData";
import { FinishTrackedSession } from "../application/use-cases/FinishTrackedSession";
import { GetParentDashboard } from "../application/use-cases/GetParentDashboard";
import { ImportProfileData } from "../application/use-cases/ImportProfileData";
import { SubmitMathAnswer } from "../application/use-cases/SubmitMathAnswer";
import { SubmitWordAnswer } from "../application/use-cases/SubmitWordAnswer";
import { UpdateChildProfile } from "../application/use-cases/UpdateChildProfile";
import { AdaptiveLearningEngine } from "../domain/learning/AdaptiveLearningEngine";
import type { ChildProfile } from "../domain/profiles/ChildProfile";
import { RewardCalculator } from "../domain/rewards/RewardCalculator";
import {
  createRewardWallet,
  type RewardWallet,
} from "../domain/rewards/RewardWallet";
import {
  defaultAppSettings,
  type AppSettings,
} from "../domain/settings/AppSettings";
import { evaluateDailyLimit } from "../domain/time/DailyUsage";
import { HomeScreen } from "../features/home/HomeScreen";
import { MathGameScreen } from "../features/math/MathGameScreen";
import { ParentAccessScreen } from "../features/parents/ParentAccessScreen";
import { ParentDashboardScreen } from "../features/parents/ParentDashboardScreen";
import { ProfileManagementScreen } from "../features/parents/ProfileManagementScreen";
import { ProfileScreen } from "../features/profiles/ProfileScreen";
import { AccessibilitySettingsScreen } from "../features/settings/AccessibilitySettingsScreen";
import { DailyLimitScreen } from "../features/time/DailyLimitScreen";
import { WordGameScreen } from "../features/words/WordGameScreen";
import { IndexedDbAttemptRepository } from "../infrastructure/storage/indexeddb/IndexedDbAttemptRepository";
import { IndexedDbDailyUsageRepository } from "../infrastructure/storage/indexeddb/IndexedDbDailyUsageRepository";
import { IndexedDbParentAccessRepository } from "../infrastructure/storage/indexeddb/IndexedDbParentAccessRepository";
import { IndexedDbProfileRepository } from "../infrastructure/storage/indexeddb/IndexedDbProfileRepository";
import { IndexedDbProgressRepository } from "../infrastructure/storage/indexeddb/IndexedDbProgressRepository";
import { IndexedDbRewardRepository } from "../infrastructure/storage/indexeddb/IndexedDbRewardRepository";
import { IndexedDbSettingsRepository } from "../infrastructure/storage/indexeddb/IndexedDbSettingsRepository";

type Screen =
  | "profiles"
  | "home"
  | "math"
  | "words"
  | "parent-access"
  | "parents"
  | "profile-management"
  | "accessibility";

export function App() {
  const profileRepository = useMemo(() => new IndexedDbProfileRepository(), []);
  const progressRepository = useMemo(() => new IndexedDbProgressRepository(), []);
  const rewardRepository = useMemo(() => new IndexedDbRewardRepository(), []);
  const attemptRepository = useMemo(() => new IndexedDbAttemptRepository(), []);
  const dailyUsageRepository = useMemo(
    () => new IndexedDbDailyUsageRepository(),
    [],
  );
  const settingsRepository = useMemo(() => new IndexedDbSettingsRepository(), []);
  const parentAccessRepository = useMemo(
    () => new IndexedDbParentAccessRepository(),
    [],
  );

  const createChildProfile = useMemo(
    () => new CreateChildProfile(profileRepository, () => crypto.randomUUID()),
    [profileRepository],
  );
  const updateChildProfile = useMemo(
    () => new UpdateChildProfile(profileRepository),
    [profileRepository],
  );
  const archiveChildProfile = useMemo(
    () => new ArchiveChildProfile(profileRepository),
    [profileRepository],
  );
  const engine = useMemo(() => new AdaptiveLearningEngine(), []);
  const rewardCalculator = useMemo(() => new RewardCalculator(), []);

  const submitMathAnswer = useMemo(
    () =>
      new SubmitMathAnswer(
        progressRepository,
        rewardRepository,
        attemptRepository,
        engine,
        rewardCalculator,
      ),
    [attemptRepository, engine, progressRepository, rewardCalculator, rewardRepository],
  );
  const submitWordAnswer = useMemo(
    () =>
      new SubmitWordAnswer(
        progressRepository,
        rewardRepository,
        attemptRepository,
        engine,
        rewardCalculator,
      ),
    [attemptRepository, engine, progressRepository, rewardCalculator, rewardRepository],
  );
  const getParentDashboard = useMemo(
    () => new GetParentDashboard(attemptRepository, progressRepository, rewardRepository),
    [attemptRepository, progressRepository, rewardRepository],
  );
  const exportProfileData = useMemo(
    () =>
      new ExportProfileData(
        profileRepository,
        progressRepository,
        attemptRepository,
        rewardRepository,
      ),
    [attemptRepository, profileRepository, progressRepository, rewardRepository],
  );
  const importProfileData = useMemo(
    () =>
      new ImportProfileData(
        profileRepository,
        progressRepository,
        attemptRepository,
        rewardRepository,
      ),
    [attemptRepository, profileRepository, progressRepository, rewardRepository],
  );
  const finishTrackedSession = useMemo(
    () => new FinishTrackedSession(dailyUsageRepository),
    [dailyUsageRepository],
  );

  const [activeProfile, setActiveProfile] = useState<ChildProfile | null>(null);
  const [wallet, setWallet] = useState<RewardWallet | null>(null);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);
  const [screen, setScreen] = useState<Screen>("profiles");
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    void settingsRepository.get().then(setSettings);
  }, [settingsRepository]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", settings.highContrast);
    document.body.classList.toggle("reduced-motion", settings.reducedMotion);
    document.body.classList.toggle(
      "dyslexia-friendly",
      settings.dyslexiaFriendlyFont,
    );
  }, [settings]);

  useEffect(() => {
    if (!activeProfile) return;
    void refreshProfileState(activeProfile, settings.dailyLimitMinutes);
  }, [activeProfile, settings.dailyLimitMinutes]);

  async function refreshProfileState(
    profile: ChildProfile,
    limitMinutes: number,
  ): Promise<void> {
    const [storedWallet, usage] = await Promise.all([
      rewardRepository.get(profile.id),
      dailyUsageRepository.get(profile.id, localDateKey(new Date())),
    ]);

    setWallet(storedWallet ?? createRewardWallet(profile.id));
    setLimitReached(evaluateDailyLimit(usage, limitMinutes).reached);
  }

  function handleProfileSelected(profile: ChildProfile) {
    setActiveProfile(profile);
    setScreen("home");
  }

  function handleChangeProfile() {
    setActiveProfile(null);
    setWallet(null);
    setScreen("profiles");
    setLimitReached(false);
  }

  async function handleDailyLimitChange(minutes: number): Promise<void> {
    const normalized = Math.max(0, Math.min(180, minutes));
    const nextSettings = { ...settings, dailyLimitMinutes: normalized };
    setSettings(nextSettings);
    await settingsRepository.save(nextSettings);
  }

  async function handleUsageRecorded(): Promise<void> {
    if (activeProfile) {
      await refreshProfileState(activeProfile, settings.dailyLimitMinutes);
    }
  }

  if (!activeProfile || screen === "profiles") {
    return (
      <ProfileScreen
        repository={profileRepository}
        createChildProfile={createChildProfile}
        onProfileSelected={handleProfileSelected}
      />
    );
  }

  if (screen === "parent-access") {
    return (
      <ParentAccessScreen
        repository={parentAccessRepository}
        onGranted={() => setScreen("parents")}
        onCancel={() => setScreen("home")}
      />
    );
  }

  if (screen === "profile-management") {
    return (
      <ProfileManagementScreen
        repository={profileRepository}
        updateProfile={updateChildProfile}
        archiveProfile={archiveChildProfile}
        onExit={() => setScreen("parents")}
      />
    );
  }

  if (screen === "accessibility") {
    return (
      <AccessibilitySettingsScreen
        repository={settingsRepository}
        onChanged={setSettings}
        onExit={() => setScreen("parents")}
      />
    );
  }

  if (limitReached && screen !== "parents") {
    return <DailyLimitScreen profile={activeProfile} onChangeProfile={handleChangeProfile} />;
  }

  if (screen === "math") {
    return (
      <MathGameScreen
        profile={activeProfile}
        submitMathAnswer={submitMathAnswer}
        finishTrackedSession={finishTrackedSession}
        onUsageRecorded={handleUsageRecorded}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "words") {
    return (
      <WordGameScreen
        profile={activeProfile}
        submitWordAnswer={submitWordAnswer}
        finishTrackedSession={finishTrackedSession}
        onUsageRecorded={handleUsageRecorded}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "parents") {
    return (
      <ParentDashboardScreen
        profile={activeProfile}
        getParentDashboard={getParentDashboard}
        importProfileData={importProfileData}
        exportProfileData={exportProfileData}
        dailyLimitMinutes={settings.dailyLimitMinutes}
        onDailyLimitChange={(minutes) => void handleDailyLimitChange(minutes)}
        onManageProfiles={() => setScreen("profile-management")}
        onOpenAccessibility={() => setScreen("accessibility")}
        onExit={() => setScreen("home")}
      />
    );
  }

  return (
    <HomeScreen
      profile={activeProfile}
      wallet={wallet ?? createRewardWallet(activeProfile.id)}
      onOpenMath={() => setScreen("math")}
      onOpenWords={() => setScreen("words")}
      onOpenParents={() => setScreen("parent-access")}
      onChangeProfile={handleChangeProfile}
    />
  );
}

function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
