import { createHash } from "crypto";
import { download } from "electron-dl";
import fs from "fs-extra";
import path from "path";
import { WHISPER_MODELS_OPTIONS } from "../shared/constants";
import { handle, send } from "./ipc";
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

class Downloader {
  constructor(private wm: WindowManager) {}
  async init() {
    this.registerIpcHandlers();
  }

  async downloadWhisperModel(name: string) {
    const model = WHISPER_MODELS_OPTIONS.find((op) => op.name === name)!;
    const win = this.wm.win;
    try {
      await download(win!, model.url, {
        showBadge: true,
        overwrite: true,
        filename: model.name,
        directory: pref.get_whisper_model_folder(),
        onProgress: (p) => {
          send("download_whisper_model_progress", { name: model.name, progress: p.percent * 100 });
        },
      });
      const hash = await hashFile(path.join(pref.get_whisper_model_folder(), model.name));
      if (hash === model.sha) {
        send("download_whisper_model_succeeded", { name: model.name });
      } else throw "sha not matched";
    } catch (err) {
      send("download_whisper_model_failed", { name: model.name });
    } finally {
    }
  }

  private registerIpcHandlers() {
    handle("download_whisper_model", async (_event, name: string) => {
      this.downloadWhisperModel(name);
    });
    handle("download_whisper_default_model", async (_event) => {
      return this.downloadWhisperModel(WHISPER_MODELS_OPTIONS[0].name);
    });
  }
}

export const downloader = new Downloader(wm);
