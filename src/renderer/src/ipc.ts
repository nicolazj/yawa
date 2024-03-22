import { IpcRendererListener } from "@electron-toolkit/preload";
import { Channel } from "src/shared/ipc";

export function receive(c: Channel, listener: IpcRendererListener) {
  return window.electron.ipcRenderer.on(c, listener);
}
