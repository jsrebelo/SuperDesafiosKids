import { useCallback, useEffect, useState } from "react";
import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import type { CreateChildProfile } from "../../application/use-cases/CreateChildProfile";
import type {
  ChildAge,
  ChildProfile,
} from "../../domain/profiles/ChildProfile";
import { Button } from "../../shared/components/Button";

interface ProfileScreenProps {
  readonly repository: ProfileRepository;
  readonly createChildProfile: CreateChildProfile;
}

const avatars = ["raposa", "panda", "robot", "dinossauro"] as const;
const ages: ChildAge[] = [5, 6, 7, 8, 9, 10];

export function ProfileScreen({
  repository,
  createChildProfile,
}: ProfileScreenProps) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState<ChildAge>(5);
  const [avatarId, setAvatarId] = useState<(typeof avatars)[number]>("raposa");
  const [message, setMessage] = useState("");

  const loadProfiles = useCallback(async () => {
    setProfiles(await repository.list());
  }, [repository]);

  useEffect(() => {
    void loadProfiles();
  }, [loadProfiles]);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      await createChildProfile.execute({ displayName, age, avatarId });
      setDisplayName("");
      setMessage("Perfil criado com sucesso!");
      await loadProfiles();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível criar o perfil.");
    }
  }

  async function handleSelect(profileId: string) {
    await repository.setActive(profileId);
    setMessage("Perfil selecionado. Vamos aprender!");
    await loadProfiles();
  }

  return (
    <main className="page-shell">
      <section className="hero-card" aria-labelledby="page-title">
        <p className="eyebrow">Super Desafios Kids</p>
        <h1 id="page-title">Quem vai jogar?</h1>
        <p>Escolhe um perfil ou cria um novo.</p>
      </section>

      <section aria-labelledby="profiles-title">
        <h2 id="profiles-title">Perfis</h2>
        <div className="profile-grid">
          {profiles.length === 0 ? (
            <p>Ainda não existem perfis.</p>
          ) : (
            profiles.map((profile) => (
              <article
                className={`profile-card ${profile.isActive ? "profile-card--active" : ""}`}
                key={profile.id}
              >
                <span className="profile-avatar" aria-hidden="true">
                  {avatarSymbol(profile.avatarId)}
                </span>
                <h3>{profile.displayName}</h3>
                <p>{profile.age} anos</p>
                <Button onClick={() => void handleSelect(profile.id)}>
                  {profile.isActive ? "Selecionado" : "Escolher"}
                </Button>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="form-card" aria-labelledby="create-title">
        <h2 id="create-title">Criar perfil</h2>
        <form onSubmit={(event) => void handleCreate(event)}>
          <label>
            Nome
            <input
              maxLength={20}
              onChange={(event) => setDisplayName(event.target.value)}
              required
              value={displayName}
            />
          </label>

          <label>
            Idade
            <select
              onChange={(event) => setAge(Number(event.target.value) as ChildAge)}
              value={age}
            >
              {ages.map((item) => (
                <option key={item} value={item}>
                  {item} anos
                </option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Avatar</legend>
            <div className="avatar-options">
              {avatars.map((avatar) => (
                <label key={avatar}>
                  <input
                    checked={avatarId === avatar}
                    name="avatar"
                    onChange={() => setAvatarId(avatar)}
                    type="radio"
                    value={avatar}
                  />
                  <span aria-hidden="true">{avatarSymbol(avatar)}</span>
                  <span>{avatar}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="submit">Criar perfil</Button>
        </form>
        <p aria-live="polite">{message}</p>
      </section>
    </main>
  );
}

function avatarSymbol(avatarId: string): string {
  const symbols: Record<string, string> = {
    raposa: "🦊",
    panda: "🐼",
    robot: "🤖",
    dinossauro: "🦖",
  };

  return symbols[avatarId] ?? "⭐";
}
