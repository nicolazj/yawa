import { Button } from "@renderer/shadcn/ui/button";
import { ListOrdered } from "lucide-react";

export function Qeueu() {
  return (
    <Button
      variant={"outline"}
      className="flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
    >
      <ListOrdered />
      Queue
    </Button>
  );

  // const [queue, setQueue] = useState<TransQueueItem[]>([]);
  // useEffect(() => {
  //   return receive("queue_update", (_e, q: TransQueueItem[]) => {
  //     setQueue(q);
  //   });
  // }, []);
  // return (
  //   <Table className="max-w-full">
  //     <TableHeader>
  //       <TableRow>
  //         <TableHead>Name</TableHead>
  //         <TableHead className="text-right">Status</TableHead>
  //       </TableRow>
  //     </TableHeader>
  //     <TableBody>
  //       {queue.map((item) => {
  //         return (
  //           <TableRow key={item.id}>
  //             <TableCell className="">
  //               <div className="truncate w-[300px]">{item.path}</div>
  //             </TableCell>
  //             <TableCell className="text-right">{item.status}</TableCell>
  //           </TableRow>
  //         );
  //       })}
  //     </TableBody>
  //   </Table>
  // );
}
