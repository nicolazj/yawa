import { Button } from "@renderer/shadcn/ui/button";
import { FolderOpen } from "lucide-react";

export function OpenFolder() {
  let onOpen = ()=>{
    window.api.open_library_folder()
  }
  return (
    <Button
      variant={"outline"}
      className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
      onClick={onOpen}
    >
      <FolderOpen/>
      Open Library
    </Button>
  );
}
