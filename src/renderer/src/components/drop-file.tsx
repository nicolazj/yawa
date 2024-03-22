import { Import } from "lucide-react";
import { DragEventHandler, useEffect } from "react";
import { AudioFormats, VideoFormats } from "../../../shared/constants";

export function Dropfile() {
  let onDrop: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
    if (!ev.dataTransfer) return;
    if (!ev.dataTransfer.files) return;
    console.log(ev.dataTransfer.files);
    // window.api.addTask({
    //   type: 'file',
    //   files: [...ev.dataTransfer.files].map((f) => ({
    //     path: f.path,
    //     name: f.name,
    //     size: f.size,
    //     type: f.type
    //   }))
    // })
  };

  let onDragOver: DragEventHandler<HTMLDivElement> = (ev) => {
    ev.preventDefault();
  };
  useEffect(() => {
    let onPaste = (event: ClipboardEvent) => {
      event.preventDefault();
      let paste = event.clipboardData?.getData("text");
      console.log(paste);
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, []);
  return (
    <div className="p-4 ">
      <div
        className="hover:bg-accent w-full h-[200px] border-dashed border mb-8 rounded-lg items-center justify-center flex flex-col gap-2"
        // onPaste={onPaste}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Import />
        <p className="text-lg">Drop files here</p>
        <p className="text-xs opacity-50">
          {`${AudioFormats.join(", ")}  ${VideoFormats.join(", ")}`}
        </p>
      </div>
    </div>
  );
}
