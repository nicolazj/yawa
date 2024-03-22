export type PrefKey = "whisper_model" | "onboarded";

export type Channel =
  | "theme_get"
  | "theme_update"
  | "pref_get"
  | "pref_set"
  | "get_whisper_active_model_name"
  | "download_whisper_model"
  | "download_whisper_default_model"
  | "download_whisper_model_succeeded"
  | "download_whisper_model_failed"
  | "download_whisper_model_progress";
