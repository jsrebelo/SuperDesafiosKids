import { useMemo } from "react";
import { CreateChildProfile } from "../application/use-cases/CreateChildProfile";
import { BrowserProfileRepository } from "../infrastructure/storage/BrowserProfileRepository";
import { ProfileScreen } from "../features/profiles/ProfileScreen";

export function App() {
  const repository = useMemo(() => new BrowserProfileRepository(), []);
  const createChildProfile = useMemo(
    () => new CreateChildProfile(repository, crypto.randomUUID),
    [repository],
  );

  return (
    <ProfileScreen
      repository={repository}
      createChildProfile={createChildProfile}
    />
  );
}
