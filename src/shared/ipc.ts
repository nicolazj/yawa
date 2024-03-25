export type PrefKey = "whisper_model" | "onboarded";

export type Channel =
  | "theme_get"
  | "theme_update"
  | "pref_get"
  | "pref_set"
  | "get_whisper_active_model_name"
  | "tasks_add"
  | "queue_update"
  | "whisper_models_get"
  | "whisper_models_update"
  | "whisper_models_set_active"
  |"save_recording";
