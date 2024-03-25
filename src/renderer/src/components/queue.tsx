import { Progress } from "@radix-ui/react-progress";
import { receive } from "@renderer/ipc";
import { Button } from "@renderer/shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@renderer/shadcn/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@renderer/shadcn/ui/table";
import { ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";
import { TransQueueItem } from "src/shared/types";

function getFilename(item: TransQueueItem) {
  return item.path ? item.path.replace(/^.*[\\/]/, "") : item.link;
}
export function Qeueu() {
  const [queue, setQueue] = useState<TransQueueItem[]>([]);
  useEffect(() => {
    return receive("queue_update", (_e, q: TransQueueItem[]) => {
      setQueue(q);
    });
  }, []);
  const processing = queue.find((t) => t.status === "processing");

  return (
    <>
      {processing ? (
        <Progress className="h-1 absolute bottom-0" value={processing?.progress ?? 0} />
      ) : null}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
          >
            <ListOrdered />
            Queue
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[80%]">
          <SheetHeader className="">
            <SheetTitle></SheetTitle>
            <Table className="text-xs max-w-full overflow-hidden">
              <TableBody>
                {queue.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="text-left ">{getFilename(item)}</TableCell>
                      <TableCell className="text-right">{item.status}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
