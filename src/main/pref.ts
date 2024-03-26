import { app } from "electron";
import settings from 'electron-settings';
import fs from "fs-extra";
import path from "path";
import { LIBRARY_PATH_SUFFIX } from "../shared/constants";
import { PrefKey } from "../shared/ipc";
import { handle } from "./ipc";
import log from "./logger";

const logger = log.scope("pref");
class Pref {
  constructor() {
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
    logger.log("get_setting", key);
    return settings.getSync(key) as string;
  }
  set_pref(key: PrefKey, value: any) {
    logger.log("set_setting", key, value);
    return settings.setSync(key, value);
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
