import { PrefKey } from "../shared/ipc";
import { TransTask, WhisperModelInfo } from "../shared/types";
import { invoke } from "./ipc";

// Custom APIs for renderer
export const api = {
  get_theme: () => {
    return invoke("theme_get");
  },
  get_pref: (key: PrefKey) => {
    return invoke("pref_get", key);
  },
  set_pref: (key: PrefKey, value) => {
    return invoke("pref_set", key, value);
  },
  get_whisper_active_model_name: () => {
    return invoke("get_whisper_active_model_name");
  },
  add_tasks: (tasks: TransTask[]) => {
    return invoke("tasks_add", tasks);
  },
  get_whisper_models(): Promise<WhisperModelInfo[]> {
    return invoke("whisper_models_get");
  },
  set_active_whisper_model(name: string) {
    return invoke("whisper_models_set_active", name);
  },
  save_recording(blob: ArrayBuffer) {
    return invoke("save_recording", blob);
  },
  open_library_folder() {
    return invoke("open_library_folder");
  },
};

export type API = typeof api;
