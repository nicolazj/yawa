import { receive } from "@renderer/ipc";
import { Progress } from "@renderer/shadcn/ui/progress";
import { PropsWithChildren, useEffect, useState } from "react";

function OnboardingContent(){
  let [progress, setProgress] = useState(0);
  useEffect(() => {
    return receive("download_whisper_model_progress", (_event, data: { progress: number }) => {
      setProgress(data.progress);
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
  let [determined, determinedSet] = useState(false); // -1 undetermined
  let [onboarded, onboardedSet] = useState(false); // -1 undetermined

  useEffect(() => {
    async function run() {
      let onboarded = await window.api.get_pref("onboarded");
      determinedSet(true);
      onboardedSet(!!onboarded);
      if (!onboarded) {
        await window.api.download_whisper_default_model();
      }
      await window.api.set_pref("onboarded", true);
      onboardedSet(true);
    }
    run();
  }, []);
 

  if (!determined) return null;
  if (onboarded) return props.children;
  return <OnboardingContent />
 
}
