import { BrowserWindow, app, nativeTheme } from "electron";
import { handle, send } from "../../shared/ipc";

class Theme {
  init() {
    nativeTheme.on("updated", () => {
      console.log("theme updated", nativeTheme.shouldUseDarkColors ? "dark" : "light");
      let wins = BrowserWindow.getAllWindows();
      send(wins, "theme:update", nativeTheme.shouldUseDarkColors ? "dark" : "light");
    });

    handle("theme:get", (_e) => {
      return nativeTheme.themeSource;
    });
  }
}

export const theme = new Theme();
