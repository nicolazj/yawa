import { receive } from "@renderer/ipc";
import { Progress } from "@renderer/shadcn/ui/progress";
import { PropsWithChildren, useEffect, useState } from "react";
import { WhisperModelInfo } from "src/shared/types";

function OnboardingContent() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return receive("whisper_models_update", (_event, models: WhisperModelInfo[]) => {
      let downloading = models.find((m) => m.downloading)!;
      setProgress(downloading.progress ?? 0);
    });
  }, []);
  return (
    <div className="flex-1 flex p-4 flex-col items-center justify-center gap-4">
      <h1 className="text-lg">Welcome to Yawa</h1>
      <p className="text-xs opacity-50">
        Sit tight and relax, we are downloading essential files for this wounderful tool to work.
      </p>
      <Progress value={progress} className="m-4" />
    </div>
  );
}

export function Onboarding(props: PropsWithChildren<{}>) {
  const [determined, determinedSet] = useState(false); 
  const [onboarded, onboardedSet] = useState(false); 

  useEffect(() => {
    async function run() {
      const model = await window.api.get_whisper_active_model_name()
      determinedSet(true);
      onboardedSet(!!model);
    }
    run();

  }, []);

  if (!determined) return null;
  if (onboarded) return props.children;
  return <OnboardingContent />;
}
