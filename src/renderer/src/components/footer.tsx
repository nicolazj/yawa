import { receive } from "@renderer/ipc";
import { Progress } from "@renderer/shadcn/ui/progress";
import { useState, useEffect } from "react";
import { TransQueueItem } from "src/shared/types";

export function Footer() {
  let [queue, setQueue] = useState<TransQueueItem[]>([]);
  useEffect(() => {
    return receive("queue", (_e, q: TransQueueItem[]) => {
      setQueue(q);
    });
  }, []);
  let processing = queue.find((t) => t.status === "processing");
  return (
    <div className="h-8">
      <div className=" h-full flex flex-col justify-end">
        {processing ? <Progress className="h-1" value={processing?.progress ?? 0} /> : null}
      </div>
    </div>
  );
}
