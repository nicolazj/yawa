import ElectronStore from "electron-store";
import { PrefKey } from "../shared/ipc";
import fs from "fs-extra";
import path from "path";
import { app } from "electron";
import { LIBRARY_PATH_SUFFIX, WHISPER_MODELS_OPTIONS } from "../shared/constants";
import { handle } from "./ipc";
import log from "./logger";

const logger = log.scope("pref");
class Pref {
  private store: ElectronStore;
  constructor() {
    this.store = new ElectronStore();
  }
  private check_whisper_model_exist(name: string) {
    return fs.existsSync(path.join(this.get_whisper_model_folder(), name));
  }
  private get_whisper_fallback_model() {
    const found = WHISPER_MODELS_OPTIONS.find((model) =>
      this.check_whisper_model_exist(model.name)
    );
    return found?.name;
  }

  get_library_path() {
    const library = path.join(app.getPath("documents"), LIBRARY_PATH_SUFFIX);
    fs.ensureDirSync(library);
    return library;
  }
  get_whisper_model_folder() {
    return path.join(this.get_library_path(), "models");
  }
  get_whisper_active_model_name() {
    const model_name = this.get_pref("whisper_model") as string;
    if (model_name && this.check_whisper_model_exist(model_name)) return model_name;
    return this.get_whisper_fallback_model();
  }
  get_whisper_model_path() {
    const name = this.get_whisper_active_model_name()!;
    return path.join(this.get_whisper_model_folder(), name);
  }

  get_pref(key: PrefKey) {
    return this.store.get(key);
  }
  set_pref(key: PrefKey, value: any) {
    logger.log("set_setting", key, value);
    return this.store.set(key, value);
  }
  init() {
    handle("pref_get", (_e, key: PrefKey) => {
      return this.get_pref(key);
    });
    handle("pref_set", (_e, key: PrefKey, value: any) => {
      return this.set_pref(key, value);
    });
    handle("get_whisper_active_model_name", () => this.get_whisper_active_model_name());
  }
}

export const pref = new Pref();
