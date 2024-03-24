import path from "path";
import { whisper } from "./whisper";
import fs from "fs-extra";
import { TransQueueItem } from "../shared/types";
import log from "./logger";
import { ffmpeg } from "./ffmpeg";


export type Processor = (item: TransQueueItem, onProgress: (progress: number) => void) => Promise<void>;


const logger = log.scope('processor')

export const processor: Processor = async (item, onProgress) => {
  logger.log('processing task',item)

  if (item.link) {
    // download link
    item.path = "xxxx";
  }
  let filename = path.basename(item.path!);
  let dirname = path.dirname(item.path!);
  let wavPath = path.resolve(dirname, `${filename}.wav`);
  if (!fs.existsSync(wavPath)) {
    logger.log('coverting to wav')
    await ffmpeg.convertToWav(item.path!, wavPath);
  }
  await whisper.transcribe(wavPath, { onProgress });
};
