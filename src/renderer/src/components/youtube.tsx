import { Youtube as YoutubeIcon } from "lucide-react";
import { Button } from "../shadcn/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@renderer/shadcn/ui/dialog";
import { Input } from "@renderer/shadcn/ui/input";
import { useState } from "react";

const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;
const validQueryDomains = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "gaming.youtube.com",
]);
// ref: https://github.com/fent/node-ytdl-core/blob/master/lib/url-utils.js
let validateYtVideoId = (id: string) => {
  return /^[a-zA-Z0-9_-]{11}$/.test(id.trim());
};

let getYtVideoId = (url: string) => {
  const parsed = new URL(url);
  let id = parsed.searchParams.get("v");
  if (validPathDomains.test(url.trim()) && !id) {
    const paths = parsed.pathname.split("/");
    id = parsed.host === "youtu.be" ? paths[1] : paths[2];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    throw Error("Not a YouTube domain");
  }
  if (!id) {
    throw Error(`No video id found: "${url}"`);
  }
  id = id.substring(0, 11);
  if (!validateYtVideoId(id)) {
    throw Error(`Invalid video id: "${id}"`);
  }

  return id;
};

let validateYtURL = (url: string) => {
  try {
    getYtVideoId(url);
    return true;
  } catch (error) {
    return false;
  }
};

export function Youtube() {
  let [open, openSet] = useState(false);
  let [link, linkSet] = useState("");
  let [valid, validSet] = useState(false);
  let onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    linkSet(e.target.value);
    let valid = validateYtURL(e.target.value);
    validSet(valid);
  };
  let onTranscribe = () => {
    window.api.add_tasks([{ link: link }]);
    openSet(false);
  };
  return (
    <Dialog open={open} onOpenChange={(op) => openSet(op)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => openSet(true)}
          variant={"outline"}
          className="text-xs flex flex-col h-[100px] items-center justify-center gap-2 border-2 rounded"
        >
          <YoutubeIcon />
          Youtube
        </Button>
      </DialogTrigger>
      <DialogContent className="outline-none border-none">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>Paste Youtube link below</DialogTitle>
          <Input
            placeholder="https://www.youtube.com/watch?v=bRXqoWoP8yk"
            onChange={onChange}
            value={link}
          />
        <div className="flex gap-2">
        <Button  onClick={()=>openSet(false)} variant={'secondary'}>
            Cancel
          </Button>
        <Button disabled={!valid} onClick={onTranscribe} className="flex-1">
            Transcribe
          </Button>
        </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
