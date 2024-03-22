import { ipcRenderer } from "electron";
import { Channel } from "../shared/ipc";


export async function invoke(c: Channel, ...args: any[]) {
  console.log("invoking...",c, ...args);
  let res = await ipcRenderer.invoke(c, ...args);
  console.log("invoking result...",c, ...args,res);
  return res;
}


