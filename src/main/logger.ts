import log from "electron-log/main";
import path from "path";
import { pref } from "./pref";

log.initialize({ preload: true });

log.transports.file.level = "info";
log.transports.file.resolvePathFn = () => path.join(pref.get_library_path(), "logs", "main.log");
log.errorHandler.startCatching();

export default log;
