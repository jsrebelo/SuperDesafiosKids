import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomeScreen } from "./HomeScreen";
import type { ChildProfile } from "../../domain/profiles/ChildProfile";

const profile: ChildProfile = {
  id: "profile-1",
  displayName: "Mia",
  age: 6,
  avatarId: "raposa",
  createdAt: "2026-07-17T10:00:00.000Z",
  updatedAt: "2026-07-17T10:00:00.000Z",
  isActive: true,
};

describe("HomeScreen", () => {
  it("abre o jogo de matemática", () => {
    const onOpenMath = vi.fn();
    const onOpenWords = vi.fn();

    render(
      <HomeScreen
        profile={profile}
        onOpenMath={onOpenMath}
        onOpenWords={onOpenWords}
        onChangeProfile={() => undefined}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Jogar Matemática" }));
    expect(onOpenMath).toHaveBeenCalledOnce();
  });
});
