import { useEffect, useMemo, useState } from "react";
import { CreateChildProfile } from "../application/use-cases/CreateChildProfile";
import { SubmitMathAnswer } from "../application/use-cases/SubmitMathAnswer";
import { SubmitWordAnswer } from "../application/use-cases/SubmitWordAnswer";
import { GetParentDashboard } from "../application/use-cases/GetParentDashboard";
import { AdaptiveLearningEngine } from "../domain/learning/AdaptiveLearningEngine";
import { RewardCalculator } from "../domain/rewards/RewardCalculator";
import {
  createRewardWallet,
  type RewardWallet,
} from "../domain/rewards/RewardWallet";
import type { ChildProfile } from "../domain/profiles/ChildProfile";
import { evaluateDailyLimit } from "../domain/time/DailyUsage";
import { HomeScreen } from "../features/home/HomeScreen";
import { MathGameScreen } from "../features/math/MathGameScreen";
import { WordGameScreen } from "../features/words/WordGameScreen";
import { ProfileScreen } from "../features/profiles/ProfileScreen";
import { ParentDashboardScreen } from "../features/parents/ParentDashboardScreen";
import { DailyLimitScreen } from "../features/time/DailyLimitScreen";
import { BrowserProfileRepository } from "../infrastructure/storage/BrowserProfileRepository";
import { BrowserProgressRepository } from "../infrastructure/storage/BrowserProgressRepository";
import { BrowserRewardRepository } from "../infrastructure/storage/BrowserRewardRepository";
import { BrowserAttemptRepository } from "../infrastructure/storage/BrowserAttemptRepository";
import { BrowserDailyUsageRepository } from "../infrastructure/storage/BrowserDailyUsageRepository";

type Screen = "profiles" | "home" | "math" | "words" | "parents";

const LIMIT_KEY = "sdk.dailyLimitMinutes.v1";

export function App() {
  const profileRepository = useMemo(
    () => new BrowserProfileRepository(),
    [],
  );
  const progressRepository = useMemo(
    () => new BrowserProgressRepository(),
    [],
  );
  const rewardRepository = useMemo(
    () => new BrowserRewardRepository(),
    [],
  );
  const attemptRepository = useMemo(
    () => new BrowserAttemptRepository(),
    [],
  );
  const dailyUsageRepository = useMemo(
    () => new BrowserDailyUsageRepository(),
    [],
  );

  const createChildProfile = useMemo(
    () => new CreateChildProfile(profileRepository, crypto.randomUUID),
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
    [
      attemptRepository,
      engine,
      progressRepository,
      rewardCalculator,
      rewardRepository,
    ],
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
    [
      attemptRepository,
      engine,
      progressRepository,
      rewardCalculator,
      rewardRepository,
    ],
  );

  const getParentDashboard = useMemo(
    () =>
      new GetParentDashboard(
        attemptRepository,
        progressRepository,
        rewardRepository,
      ),
    [attemptRepository, progressRepository, rewardRepository],
  );

  const [activeProfile, setActiveProfile] =
    useState<ChildProfile | null>(null);
  const [wallet, setWallet] = useState<RewardWallet | null>(null);
  const [screen, setScreen] = useState<Screen>("profiles");
  const [dailyLimitMinutes, setDailyLimitMinutes] = useState(() =>
    Number(window.localStorage.getItem(LIMIT_KEY) ?? 30),
  );
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    if (!activeProfile) return;

    void rewardRepository.get(activeProfile.id).then((result) => {
      setWallet(result ?? createRewardWallet(activeProfile.id));
    });

    const today = new Date().toISOString().slice(0, 10);

    void dailyUsageRepository
      .get(activeProfile.id, today)
      .then((usage) => {
        setLimitReached(
          evaluateDailyLimit(usage, dailyLimitMinutes).reached,
        );
      });
  }, [
    activeProfile,
    dailyLimitMinutes,
    dailyUsageRepository,
    rewardRepository,
  ]);

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

  function handleDailyLimitChange(minutes: number) {
    const normalized = Math.max(0, Math.min(180, minutes));
    setDailyLimitMinutes(normalized);
    window.localStorage.setItem(LIMIT_KEY, String(normalized));
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

  if (limitReached && screen !== "parents") {
    return (
      <DailyLimitScreen
        profile={activeProfile}
        onChangeProfile={handleChangeProfile}
      />
    );
  }

  if (screen === "math") {
    return (
      <MathGameScreen
        profile={activeProfile}
        submitMathAnswer={submitMathAnswer}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "words") {
    return (
      <WordGameScreen
        profile={activeProfile}
        submitWordAnswer={submitWordAnswer}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "parents") {
    return (
      <ParentDashboardScreen
        profile={activeProfile}
        getParentDashboard={getParentDashboard}
        dailyLimitMinutes={dailyLimitMinutes}
        onDailyLimitChange={handleDailyLimitChange}
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
      onOpenParents={() => setScreen("parents")}
      onChangeProfile={handleChangeProfile}
    />
  );
}
