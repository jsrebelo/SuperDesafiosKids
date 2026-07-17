# DATA_MODEL

## Entidades principais

### ChildProfile

- id
- displayName
- birthYear ou ageBand
- avatarId
- createdAt
- updatedAt
- active

### SkillProgress

- profileId
- skillId
- estimatedLevel
- masteryScore
- confidence
- recentAccuracy
- updatedAt

### ExerciseAttempt

- id
- profileId
- exerciseId
- skillId
- difficulty
- answer
- correct
- responseTimeMs
- hintsUsed
- createdAt

### LearningSession

- id
- profileId
- gameId
- startedAt
- endedAt
- attempts
- xpEarned
- coinsEarned

### RewardWallet

- profileId
- xp
- coins
- stars

### Unlock

- profileId
- itemId
- unlockedAt

### AppSettings

- locale
- soundEnabled
- musicEnabled
- readAloudEnabled
- highContrast
- dyslexiaFriendlyFont
- dailyLimitMinutes

## Regras

- Não guardar data de nascimento completa no MVP.
- Identificadores são gerados localmente.
- Tentativas são imutáveis após gravação.
- Estatísticas podem ser recalculadas a partir das tentativas.
