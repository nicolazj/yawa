import { invoke } from "../shared/ipc";

// Custom APIs for renderer
export const api = {
  getTheme: () => {
    return invoke('theme:get')
  },
};

export type API = typeof api;