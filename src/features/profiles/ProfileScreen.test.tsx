import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import { CreateChildProfile } from "../../application/use-cases/CreateChildProfile";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import { ProfileScreen } from "./ProfileScreen";

class MemoryProfileRepository implements ProfileRepository {
  private profiles: ChildProfile[] = [];

  public async create(profile: ChildProfile): Promise<void> {
    this.profiles.push(profile);
  }

  public async list(): Promise<ChildProfile[]> {
    return this.profiles;
  }

  public async setActive(profileId: string): Promise<void> {
    this.profiles = this.profiles.map((profile) => ({
      ...profile,
      isActive: profile.id === profileId,
    }));
  }
}

describe("ProfileScreen", () => {
  it("permite criar um perfil", async () => {
    const repository = new MemoryProfileRepository();
    const createProfile = new CreateChildProfile(
      repository,
      () => "profile-1",
      () => new Date("2026-07-17T10:00:00.000Z"),
    );

    render(
      <ProfileScreen
        repository={repository}
        createChildProfile={createProfile}
      />,
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Tomás" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Criar perfil" }));

    expect(await screen.findByText("Perfil criado com sucesso!")).toBeInTheDocument();
    expect(await screen.findByText("Tomás")).toBeInTheDocument();
  });
});
