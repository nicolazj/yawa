import { receive } from "@renderer/ipc";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@renderer/shadcn/ui/table";

import { useEffect, useState } from "react";
import { TransQueueItem } from "src/shared/types";

export function Qeueu() {
  const [queue, setQueue] = useState<TransQueueItem[]>([]);
  useEffect(() => {
    return receive("queue", (_e, q: TransQueueItem[]) => {
      setQueue(q);
    });
  }, []);
  return (
    <Table className="max-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {queue.map((item) => {
          return (
            <TableRow key={item.id}>
              <TableCell className="">
                <div className="truncate w-[300px]">{item.path}</div>
              </TableCell>
              <TableCell className="text-right">{item.status}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
