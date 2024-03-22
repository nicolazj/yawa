import { ipcMain } from "electron";
import { Channel } from "../shared/ipc";
import { wm } from "./window-manager";

export function handle(
  c: Channel,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) {
  return ipcMain.handle(c, listener);
}

export function send(c: Channel, ...args: any[]) {
  console.log("sending", c, ...args);
  wm.win?.webContents.send(c, ...args);
}
