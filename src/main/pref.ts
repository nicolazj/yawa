import { app } from "electron";
import ElectronStore from "electron-store";
import fs from "fs-extra";
import path from "path";
import { LIBRARY_PATH_SUFFIX } from "../shared/constants";
import { PrefKey } from "../shared/ipc";
import { handle } from "./ipc";
import log from "./logger";

const logger = log.scope("pref");
class Pref {
  private store: ElectronStore;
  constructor() {
    this.store = new ElectronStore();
  }

  get_library_path() {
    const library = path.join(app.getPath("documents"), LIBRARY_PATH_SUFFIX);
    fs.ensureDirSync(library);
    return library;
  }
  get_library_recording_path() {
    const library = path.join(app.getPath("documents"), LIBRARY_PATH_SUFFIX, "recordings");
    fs.ensureDirSync(library);
    return library;
  }

  get_pref(key: PrefKey) {
    return this.store.get(key);
  }
  set_pref(key: PrefKey, value: any) {
    logger.log("set_setting", key, value);
    return this.store.set(key, value);
  }

  async init() {
    this.register_handlers();
  }

  register_handlers() {
    handle("pref_get", (_e, key: PrefKey) => {
      return this.get_pref(key);
    });
    handle("pref_set", (_e, key: PrefKey, value: any) => {
      return this.set_pref(key, value);
    });
  }
}

export const pref = new Pref();
