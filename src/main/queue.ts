import log from "./logger";
import { TransQueueItem, TransTask } from "../shared/types";
import { handle, send } from "./ipc";
import { processor } from "./processor";

const logger = log.scope("queue");

let id = 0;
export class Queue {
  private isRunning = false;
  constructor(private queue: TransQueueItem[] = []) {}

  public init() {
    this.registerIpcHandlers();
  }

  private async addTasks(tasks: TransTask[]) {
    let tq: TransQueueItem[] = tasks.map((t) => ({
      ...t,
      status: "pending",
      id: id++,
    }));
    this.queue.push(...tq);
    this.runTask();
  }

  pickTask() {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].status === "pending") {
        return this.queue[i];
      }
    }
    return undefined;
  }

  private async runTask() {
    let self = this;
    async function worker() {
      while (true) {
        const task = self.pickTask();
        if (!task) {
          return;
        }

        task.status = "processing";
        send("queue", self.queue);

        try {
          await processor(task, (progress) => {
            // wm.win?.webContents.send(`transcribe-progress-${task.id}`, progress);
            task.progress = progress;
            send("queue", self.queue);
          });

          task.status = "done";
          send("queue", self.queue);
        } catch (e) {
          logger.error("transcribe failed", e);
          task.status = "failed";
          send("queue", self.queue);
        }
      }
    }

    if (this.isRunning) return;
    this.isRunning = true;
    await Promise.all(new Array(1).fill(0).map(worker));
    this.isRunning = false;
  }

  private registerIpcHandlers() {
    handle("add_tasks", async (_event, tasks: TransTask[]) => {
      await this.addTasks(tasks);
    });
  }
}

export const queue = new Queue();
