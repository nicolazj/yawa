import ElectronStore from "electron-store";
import { PrefKey } from "../shared/ipc";
import fs from "fs-extra";
import path from "path";
import { app } from "electron";
import { LIBRARY_PATH_SUFFIX, WHISPER_MODELS_OPTIONS } from "../shared/constants";
import { handle, send } from "./ipc";
import log from "./logger";
import { WindowManager, wm } from "./window-manager";
import { download } from "electron-dl";
import { createHash } from "crypto";
import { WhisperModelInfo } from "../shared/types";

function hashFile(path: string) {
  const algo = "sha1";
  return new Promise((resolve, reject) => {
    const hash = createHash(algo);
    const stream = fs.createReadStream(path);
    stream.on("error", reject);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

const logger = log.scope("pref");
class Pref {
  private store: ElectronStore;
  private whisper_models: WhisperModelInfo[];
  constructor(private wm: WindowManager) {
    this.store = new ElectronStore();
    this.whisper_models = WHISPER_MODELS_OPTIONS.map((op) => {
      return {
        name: op.name,
        type: op.type,
        desc: op.desc,
        downloading: false,
        available: this.check_whisper_model_exist(op.name),
        active: op.name === this.get_whisper_active_model_name(),
      };
    });
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
  get_library_recording_path() {
    const library = path.join(app.getPath("documents"), LIBRARY_PATH_SUFFIX,'recordings');
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
  get_whisper_active_model_path() {
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
  get_whisper_models() {
    return this.whisper_models;
  }

  async download_whisper_model(name: string) {
    const model = WHISPER_MODELS_OPTIONS.find((op) => op.name === name)!;
    const win = this.wm.win;
    const self = this;
    try {
      await download(win!, model.url, {
        showBadge: true,
        overwrite: true,
        filename: model.name,
        directory: pref.get_whisper_model_folder(),
        onProgress: (p) => {
          let model = self.whisper_models.find((m) => m.name === name);
          model!.progress = p.percent * 100;
          send("whisper_models_update", this.whisper_models);
        },
      });
      const hash = await hashFile(path.join(pref.get_whisper_model_folder(), model.name));
      if (hash === model.sha) {
        send("whisper_models_update", this.whisper_models);
      } else throw "sha not matched";
    } catch (err) {
      send("whisper_models_update", this.whisper_models);
    }
  }
  async set_active_whisper_model(name: string) {
    let model = this.whisper_models.find((m) => m.name === name)!;

    if (!this.check_whisper_model_exist(name) && !model?.downloading) {
      model.downloading = true;
      await this.download_whisper_model(name);
    }
    this.set_pref("whisper_model", name);

    this.whisper_models.forEach((m) => {
      m.active = false;
    });
    model.active = model.available = true;

    send("whisper_models_update", this.whisper_models);
  }

  async init() {
    this.register_handlers();
    let model = this.get_whisper_active_model_name();
    if (!model) {
      this.set_active_whisper_model(WHISPER_MODELS_OPTIONS[0].name);
    }
  }

  register_handlers() {

    handle("pref_get", (_e, key: PrefKey) => {
      return this.get_pref(key);
    });
    handle("pref_set", (_e, key: PrefKey, value: any) => {
      return this.set_pref(key, value);
    });
    handle("get_whisper_active_model_name", () => this.get_whisper_active_model_name());
    handle("whisper_models_get", () => this.get_whisper_models());
    handle("whisper_models_set_active", (_event, name: string) =>
      this.set_active_whisper_model(name)
    );
  }
}

export const pref = new Pref(wm);
