import { App } from "./app";
import { Onboarding } from "./components/onboarding";
import { ThemeProvider } from "./components/theme-provider";

export function Root(): JSX.Element {
  return (
    <ThemeProvider>
      <Onboarding>
        <App />
      </Onboarding>
    </ThemeProvider>
  );
}
