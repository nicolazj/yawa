import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

export type Channel = "theme:get" | "theme:update";

export function handle(
  c: Channel,
  listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) {
  return ipcMain.handle(c, listener);
}

export function invoke(c: Channel, ...args: any[]) {
  console.log("invoking...", ...args);
  let res = ipcRenderer.invoke(c, ...args);
  console.log("invoking result", res);
  return res;
}

export function send(wins: BrowserWindow[], c: Channel, ...args: any[]) {
  console.log("sending", c, ...args);
  wins.forEach((win) => {
    win.webContents.send(c, ...args);
  });
}
