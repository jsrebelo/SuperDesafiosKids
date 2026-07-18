import { useEffect, useState } from "react";
import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import type { UpdateChildProfile } from "../../application/use-cases/UpdateChildProfile";
import type { ArchiveChildProfile } from "../../application/use-cases/ArchiveChildProfile";
import type {
  ChildAge,
  ChildProfile,
} from "../../domain/profiles/ChildProfile";
import { Button } from "../../shared/components/Button";

interface Props {
  readonly repository: ProfileRepository;
  readonly updateProfile: UpdateChildProfile;
  readonly archiveProfile: ArchiveChildProfile;
  readonly onExit: () => void;
}

const ages: ChildAge[] = [5, 6, 7, 8, 9, 10];
const avatars = ["raposa", "panda", "robot", "dinossauro"] as const;

export function ProfileManagementScreen({
  repository,
  updateProfile,
  archiveProfile,
  onExit,
}: Props) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [message, setMessage] = useState("");

  async function load() {
    setProfiles(await repository.list());
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(profile: ChildProfile) {
    try {
      await updateProfile.execute({
        id: profile.id,
        displayName: profile.displayName,
        age: profile.age,
        avatarId: profile.avatarId,
      });
      setMessage("Perfil atualizado.");
      await load();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar.",
      );
    }
  }

  async function archive(profileId: string) {
    if (!window.confirm("Arquivar este perfil?")) {
      return;
    }

    await archiveProfile.execute(profileId);
    setMessage("Perfil arquivado.");
    await load();
  }

  function updateLocal(
    profileId: string,
    patch: Partial<ChildProfile>,
  ) {
    setProfiles((items) =>
      items.map((item) =>
        item.id === profileId ? { ...item, ...patch } : item,
      ),
    );
  }

  return (
    <main className="page-shell">
      <header className="screen-header">
        <Button onClick={onExit}>Voltar</Button>
      </header>

      <section className="hero-card">
        <p className="eyebrow">Gestão de Perfis</p>
        <h1>Editar perfis</h1>
      </section>

      <div className="management-list">
        {profiles.map((profile) => (
          <section className="form-card" key={profile.id}>
            <label>
              Nome
              <input
                maxLength={20}
                onChange={(event) =>
                  updateLocal(profile.id, {
                    displayName: event.target.value,
                  })
                }
                value={profile.displayName}
              />
            </label>

            <label>
              Idade
              <select
                onChange={(event) =>
                  updateLocal(profile.id, {
                    age: Number(event.target.value) as ChildAge,
                  })
                }
                value={profile.age}
              >
                {ages.map((age) => (
                  <option key={age} value={age}>
                    {age} anos
                  </option>
                ))}
              </select>
            </label>

            <label>
              Avatar
              <select
                onChange={(event) =>
                  updateLocal(profile.id, {
                    avatarId: event.target.value,
                  })
                }
                value={profile.avatarId}
              >
                {avatars.map((avatar) => (
                  <option key={avatar} value={avatar}>
                    {avatar}
                  </option>
                ))}
              </select>
            </label>

            <div className="summary-actions">
              <Button onClick={() => void save(profile)}>
                Guardar
              </Button>
              <Button onClick={() => void archive(profile.id)}>
                Arquivar
              </Button>
            </div>
          </section>
        ))}
      </div>

      <p aria-live="polite">{message}</p>
    </main>
  );
}
