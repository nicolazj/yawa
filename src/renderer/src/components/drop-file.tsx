import { useEffect } from "react";

export function Dropfile() {
  useEffect(() => {
    const onDragOver = (ev: DragEvent) => {
      console.log("dragover");
      ev.preventDefault();
    };
    const onDrop = (ev: DragEvent) => {
      ev.preventDefault();
      if (!ev.dataTransfer) return;
      if (!ev.dataTransfer.files) return;
      window.api.add_tasks([...ev.dataTransfer.files].map((f) => ({ path: f.path })));
    };
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  });

  // useEffect(() => {
  //   const onPaste = (event: ClipboardEvent) => {
  //     event.preventDefault();
  //     const paste = event.clipboardData?.getData("text");
  //     window.api.add_tasks([{ link: paste }]);
  //   };
  //   document.addEventListener("paste", onPaste);
  //   return () => document.removeEventListener("paste", onPaste);
  // }, []);
  return (
    <div className="p-4">
      <p className="opacity-50 text-center text-xs">Or Drag & Drop files to transcribe</p>
      {/* <p className="opacity-50 text-center text-xs">Or Paste youtube link to transcribe</p> */}
      {/* <p className="text-[10px] opacity-50">{AudioFormats.join(", ")}</p> */}
      {/* <p className="text-[10px] opacity-50">{VideoFormats.join(", ")}</p> */}
    </div>
  );
}
