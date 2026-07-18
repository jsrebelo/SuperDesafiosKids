import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { ProfileRepository } from "../../application/ports/ProfileRepository";
import { CreateChildProfile } from "../../application/use-cases/CreateChildProfile";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";
import { ProfileScreen } from "./ProfileScreen";

class MemoryProfileRepository implements ProfileRepository {
  private profiles: ChildProfile[] = [];

  public async create(profile: ChildProfile): Promise<void> {
    this.profiles.push(profile);
  }

  public async update(profile: ChildProfile): Promise<void> {
    this.profiles = this.profiles.map((item) =>
      item.id === profile.id ? profile : item,
    );
  }

  public async list(): Promise<ChildProfile[]> {
    return this.profiles;
  }

  public async findById(profileId: string): Promise<ChildProfile | null> {
    return this.profiles.find((profile) => profile.id === profileId) ?? null;
  }

  public async setActive(profileId: string): Promise<void> {
    this.profiles = this.profiles.map((profile) => ({
      ...profile,
      isActive: profile.id === profileId,
    }));
  }

  public async archive(profileId: string): Promise<void> {
    this.profiles = this.profiles.filter((profile) => profile.id !== profileId);
  }
}

describe("ProfileScreen", () => {
  it("cria e seleciona um perfil", async () => {
    const repository = new MemoryProfileRepository();
    const onProfileSelected = vi.fn();
    const createProfile = new CreateChildProfile(
      repository,
      () => "profile-1",
      () => new Date("2026-07-17T10:00:00.000Z"),
    );

    render(
      <ProfileScreen
        repository={repository}
        createChildProfile={createProfile}
        onProfileSelected={onProfileSelected}
      />,
    );

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Tomás" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Criar perfil" }),
    );

    expect(
      await screen.findByText("Perfil criado com sucesso!"),
    ).toBeInTheDocument();
    expect(onProfileSelected).toHaveBeenCalled();
  });
});
