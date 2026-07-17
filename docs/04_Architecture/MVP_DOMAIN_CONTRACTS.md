# MVP_DOMAIN_CONTRACTS

## Interfaces iniciais

```ts
export interface ProfileRepository {
  create(profile: ChildProfile): Promise<void>;
  update(profile: ChildProfile): Promise<void>;
  findById(id: string): Promise<ChildProfile | null>;
  listActive(): Promise<ChildProfile[]>;
  setActive(id: string): Promise<void>;
}

export interface ExerciseRepository {
  saveAttempt(attempt: ExerciseAttempt): Promise<void>;
  listRecentAttempts(
    profileId: string,
    skillId: string,
    limit: number,
  ): Promise<ExerciseAttempt[]>;
}

export interface ProgressRepository {
  get(profileId: string, skillId: string): Promise<SkillProgress | null>;
  save(progress: SkillProgress): Promise<void>;
}
```

## Casos de utilização iniciais

- CreateChildProfile
- UpdateChildProfile
- SelectChildProfile
- GenerateMathExercise
- GenerateWordExercise
- SubmitExerciseAnswer
- StartLearningSession
- FinishLearningSession
- GetParentDashboard
- UpdateSettings
