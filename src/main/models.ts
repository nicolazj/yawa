import { createHash } from "crypto";
import { download } from "electron-dl";
import fs from "fs-extra";
import path from "path";
import { WHISPER_MODELS_OPTIONS } from "../shared/constants";
import { WhisperModelInfo } from "../shared/types";
import { handle, send } from "./ipc";
import log from "./logger";
import { pref } from "./pref";
import { WindowManager, wm } from "./window-manager";

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

const logger = log.scope("models");
class Models {
  private whisper_models: WhisperModelInfo[];
  constructor(private wm: WindowManager) {
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

  get_whisper_model_folder() {
    return path.join(pref.get_library_path(), "models");
  }
  get_whisper_active_model_name() {
    const model_name = pref.get_pref("whisper_model") as string;
    if (model_name && this.check_whisper_model_exist(model_name)) return model_name;
    else return undefined;
  }
  get_whisper_active_model_path() {
    const name = this.get_whisper_active_model_name()!;
    return path.join(this.get_whisper_model_folder(), name);
  }

  g;
  get_whisper_models() {
    return this.whisper_models;
  }

  async download_whisper_model(name: string) {
    const model = WHISPER_MODELS_OPTIONS.find((op) => op.name === name)!;
    const win = this.wm.win;
    const self = this;
    await download(win!, model.url, {
      showBadge: true,
      overwrite: true,
      filename: model.name,
      directory: this.get_whisper_model_folder(),
      onProgress: (p) => {
        let model = self.whisper_models.find((m) => m.name === name);
        model!.progress = p.percent * 100;
        send("whisper_models_update", this.whisper_models);
      },
    });
    const hash = await hashFile(path.join(this.get_whisper_model_folder(), model.name));
    if (hash === model.sha) {
      send("whisper_models_update", this.whisper_models);
    } else throw "sha not matched";
  }
  async set_active_whisper_model(name: string) {
    let model = this.whisper_models.find((m) => m.name === name)!;

    if (!this.check_whisper_model_exist(name) && !model?.downloading) {
      model.downloading = true;
      await this.download_whisper_model(name);
    }
    pref.set_pref("whisper_model", name);

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
      pref.set_pref("onboarded", false);
      await this.set_active_whisper_model(WHISPER_MODELS_OPTIONS[0].name);
      pref.set_pref("onboarded", true);
    }
  }

  register_handlers() {
    handle("get_whisper_active_model_name", () => this.get_whisper_active_model_name());
    handle("whisper_models_get", () => this.get_whisper_models());
    handle("whisper_models_set_active", (_event, name: string) =>
      this.set_active_whisper_model(name)
    );
  }
}

export const models = new Models(wm);
