import { nativeTheme } from "electron";
import { send, handle } from "./ipc";

class Theme {
  init() {
    nativeTheme.on("updated", () => {
      send("theme_update", nativeTheme.shouldUseDarkColors ? "dark" : "light");
    });

    handle("theme_get", (_e) => {
      return nativeTheme.themeSource;
    });
  }
}

export const theme = new Theme();
