import { Button } from "@renderer/shadcn/ui/button";
import { FileAudio } from "lucide-react";
import { ChangeEventHandler } from "react";

export function Openfile() {
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files) {
      window.api.add_tasks([...ev.target.files].map((f) => ({ path: f.path })));
    }
  };
  return (
    <Button
      variant={"outline"}
      className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
      asChild
    >
      <label>
        <FileAudio />
        <input type="file" className="sr-only" onChange={onChange} multiple />
        Open files...
      </label>
    </Button>
  );
}
