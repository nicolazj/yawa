import { Dropfile } from "./components/drop-file";
import { Footer } from "./components/footer";
import { ManageModels } from "./components/manage-models";
import { NewRecording } from "./components/new-recording";
import { Openfile } from "./components/open-file";
import { TitleBar } from "./components/title-bar";
import { Qeueu } from "./components/queue";
import { Toaster } from "./shadcn/ui/sonner";
import { Youtube } from "./components/youtube";
import { Button } from "./shadcn/ui/button";

export function App() {
  return (
    <div className="flex-1 flex flex-col  ">
      <TitleBar />
      <div className="flex-1  ">
        <div className="grid grid-cols-3 gap-4 p-6">
          <Openfile />
          <Youtube />
          <NewRecording />
          <Qeueu />
          <ManageModels />
          <Button
          variant={"outline"}
          className="text-xs text-accent flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
        >
         coming 
         <br />soon...
        </Button>
        </div>
        <Dropfile />
      </div>
      <Footer />
      <Toaster/>
    </div>
  );
}
