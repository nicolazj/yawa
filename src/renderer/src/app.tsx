import { Dropfile } from "./components/drop-file";
import { TitleBar } from "./components/title-bar";
import { FileAudio, Mic, ListOrdered, Cog } from "lucide-react";
import { Button } from "./shadcn/ui/button";
import { ChangeEventHandler } from "react";
import { Footer } from "./components/footer";

function Openfile() {
  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (ev.target.files) {
      window.api.add_tasks([...ev.target.files].map((f) => ({ path: f.path })));
    }
  };
  return (
    <Button
      variant={"outline"}
      className="flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
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
export function App(): JSX.Element {
  return (
    <div className="flex-1 flex flex-col  ">
      <TitleBar />
      <div className="flex-1  ">
        <div className="grid grid-cols-2 gap-4 p-6">
          <Openfile />
          <Button
            variant={"outline"}
            className="flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
          >
            <Mic />
            New recording
          </Button>
          <Button
            variant={"outline"}
            className="flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
          >
            <ListOrdered />
            Queue
          </Button>
          <Button
            variant={"outline"}
            className="flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
          >
            <Cog />
            Manage models
          </Button>
        </div>
        <Dropfile />
      </div>
      <Footer />
    </div>
  );
}
