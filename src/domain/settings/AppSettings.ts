export interface AppSettings {
  readonly highContrast: boolean;
  readonly reducedMotion: boolean;
  readonly dyslexiaFriendlyFont: boolean;
  readonly readAloudEnabled: boolean;
  readonly soundEnabled: boolean;
  readonly musicEnabled: boolean;
  readonly dailyLimitMinutes: number;
}

export const defaultAppSettings: AppSettings = {
  highContrast: false,
  reducedMotion: false,
  dyslexiaFriendlyFont: false,
  readAloudEnabled: false,
  soundEnabled: true,
  musicEnabled: true,
  dailyLimitMinutes: 30,
};
