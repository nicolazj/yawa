import { shell } from "electron"
import { handle } from "./ipc"
import { pref } from "./pref"

class Misc{
    init(){
        handle('open_library_folder',()=>{
            shell.openPath(pref.get_library_path())
          })
    }
}

export const misc = new Misc()