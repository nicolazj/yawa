import { ThemeProvider } from "./components/theme-provider";
import { TitleBar } from "./components/title-bar";
import { Button } from "./shadcn/ui/button";

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="flex-1 flex-col">
        <TitleBar />
        <Button>asd</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
