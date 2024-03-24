import { PrefKey } from "../shared/ipc";
import { TransTask } from "../shared/types";
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
  download_whisper_default_model: () => {
    return invoke("download_whisper_default_model");
  },
  add_tasks: (tasks: TransTask[]) => {
    return invoke("add_tasks", tasks);
  },
};

export type API = typeof api;
