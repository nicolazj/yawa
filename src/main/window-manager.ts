import { BrowserWindow, shell } from "electron";
import icon from "../../resources/icon.png?asset";
import { join } from "path";
import { is } from "@electron-toolkit/utils";

export class WindowManager {
  public win: BrowserWindow | undefined;

  createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 600,
      height: 400,
      show: false,
      resizable: false,
      titleBarStyle: "hidden",
      autoHideMenuBar: true,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
      },
    });

    mainWindow.on("ready-to-show", () => {
      mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: "deny" };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
      setTimeout(() => {
        mainWindow.webContents.openDevTools();
      }, 100);
    } else {
      mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }

    this.win = mainWindow;
  }
}

export const wm = new WindowManager();
