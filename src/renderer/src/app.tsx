import { Dropfile } from "./components/drop-file";
import { Footer } from "./components/footer";
import { ManageModels } from "./components/manage-models";
import { NewRecording } from "./components/new-recording";
import { Openfile } from "./components/open-file";
import { TitleBar } from "./components/title-bar";
import { Qeueu } from "./components/queue";
import { Toaster } from "./shadcn/ui/sonner";
import { Youtube } from "./components/youtube";
import { OpenFolder } from "./components/open-folder";

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
          <OpenFolder />
        </div>
        <Dropfile />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
