import { Button } from "@renderer/shadcn/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@renderer/shadcn/ui/sheet";
import { Mic } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
function errorCallback(e) {
  console.log("Error", e);
}

let recorder: MediaRecorder;
let chunks = [] as any;
export function NewRecording() {
  let [recording, recordingSet] = useState(false);
  let audioRef = useRef<HTMLAudioElement>(null);
  let startRecording = () => {
    recordingSet(true);
    window.navigator.getUserMedia(
      { video: false, audio: true },
      (stream) => {
        recorder = new MediaRecorder(stream);
        // videoRef.current!.srcObject = stream
        chunks = [];

        recorder.ondataavailable = (e) => {
          console.log("ondata", e);
          chunks.push(e.data as any);
        };
        recorder.start();
      },
      errorCallback
    );
  };
  let stopRecording = () => {
    recordingSet(false);

    recorder.onstop = async () => {
      console.log("stoped", chunks);
      const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
      chunks = [];
      let ab = await blob.arrayBuffer();
      window.api.save_recording(ab);
      toast('started to transcribe recording')
    };
    recorder.stop();
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
        >
          <Mic />
          New recording
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[80%]">
        <SheetHeader className="">
          <SheetTitle>New Recording</SheetTitle>
          {recording ? (
            <Button className="h-[100px] " variant={"destructive"} onClick={stopRecording}>
              Stop
            </Button>
          ) : (
            <Button className="h-[100px] transition-all" onClick={startRecording}>
              Start
            </Button>
          )}

          {/* <audio src="" controls ref={audioRef} className="w-full"></audio> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
