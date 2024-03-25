import { App } from "./app";
import { Onboarding } from "./components/onboarding";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./shadcn/ui/tooltip";

export function Root(): JSX.Element {
  return (
    <ThemeProvider>
      <TooltipProvider>

      <Onboarding>
        <App />
      </Onboarding>
      </TooltipProvider>

    </ThemeProvider>
  );
}
