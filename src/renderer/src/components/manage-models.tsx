import { Cog } from "lucide-react";
import { Button } from "../shadcn/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@renderer/shadcn/ui/sheet";
import { useEffect, useState } from "react";
import { WhisperModelInfo } from "src/shared/types";
import { Badge } from "@renderer/shadcn/ui/badge";
import { receive } from "@renderer/ipc";
import { Progress } from "@renderer/shadcn/ui/progress";

export function ManageModels() {
  let [models, modelsSet] = useState<WhisperModelInfo[]>([]);
  useEffect(() => {
    window.api.get_whisper_models().then((ms) => modelsSet(ms));
    return receive("whisper_models_update", (_e, ms) => modelsSet(ms));
  }, []);
  let setActiveModel = (name: string) => {
    window.api.set_active_whisper_model(name);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
        >
          <Cog />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[80%]">
        <SheetHeader className="">
          <SheetTitle>Select model</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-2 flex-wrap">
          {models.map((model) => {
            return (
              <Badge
                key={model.name}
                onClick={() => setActiveModel(model.name)}
                variant={model.active ? "default" : "outline"}
                className="relative  h-[30px] flex flex-col justify-center"
              >
                {model.type}
                {model.progress && !model.available ? (
                  <Progress
                    value={model.progress}
                    className="h-[2px] absolute bottom-[2px] mx-auto w-[80%]"
                  />
                ) : null}
              </Badge>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
