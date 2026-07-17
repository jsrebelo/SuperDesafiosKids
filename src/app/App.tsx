import { useMemo, useState } from "react";
import { CreateChildProfile } from "../application/use-cases/CreateChildProfile";
import { SubmitMathAnswer } from "../application/use-cases/SubmitMathAnswer";
import { SubmitWordAnswer } from "../application/use-cases/SubmitWordAnswer";
import { AdaptiveLearningEngine } from "../domain/learning/AdaptiveLearningEngine";
import { RewardCalculator } from "../domain/rewards/RewardCalculator";
import type { ChildProfile } from "../domain/profiles/ChildProfile";
import { HomeScreen } from "../features/home/HomeScreen";
import { MathGameScreen } from "../features/math/MathGameScreen";
import { WordGameScreen } from "../features/words/WordGameScreen";
import { ProfileScreen } from "../features/profiles/ProfileScreen";
import { BrowserProfileRepository } from "../infrastructure/storage/BrowserProfileRepository";
import { BrowserProgressRepository } from "../infrastructure/storage/BrowserProgressRepository";
import { BrowserRewardRepository } from "../infrastructure/storage/BrowserRewardRepository";

type Screen = "profiles" | "home" | "math" | "words";

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
        engine,
        rewardCalculator,
      ),
    [engine, progressRepository, rewardCalculator, rewardRepository],
  );

  const submitWordAnswer = useMemo(
    () =>
      new SubmitWordAnswer(
        progressRepository,
        rewardRepository,
        engine,
        rewardCalculator,
      ),
    [engine, progressRepository, rewardCalculator, rewardRepository],
  );

  const [activeProfile, setActiveProfile] =
    useState<ChildProfile | null>(null);
  const [screen, setScreen] = useState<Screen>("profiles");

  function handleProfileSelected(profile: ChildProfile) {
    setActiveProfile(profile);
    setScreen("home");
  }

  function handleChangeProfile() {
    setActiveProfile(null);
    setScreen("profiles");
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

  return (
    <HomeScreen
      profile={activeProfile}
      onOpenMath={() => setScreen("math")}
      onOpenWords={() => setScreen("words")}
      onChangeProfile={handleChangeProfile}
    />
  );
}
