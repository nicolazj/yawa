import { Dropfile } from "./components/drop-file";
import { TitleBar } from "./components/title-bar";

export function App(): JSX.Element {
  return (
    <div className="flex-1 flex-col">
      <TitleBar />

      <Dropfile />
    </div>
  );
}
