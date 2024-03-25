export const DATABASE_NAME = "whisky_database.db";
export const LIBRARY_PATH_SUFFIX = "yawa";

// https://huggingface.co/ggerganov/whisper.cpp/tree/main
export const WHISPER_MODELS_OPTIONS = [
  {
    type: "tiny",
    name: "ggml-tiny.bin",
    size: "75 MB",
    sha: "bd577a113a864445d4c299885e0cb97d4ba92b5f",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.bin",
    desc: "very fast but bad accuracy",
  },
  {
    type: "tiny.en",
    name: "ggml-tiny.en.bin",
    size: "75 MB",
    sha: "c78c86eb1a8faa21b369bcd33207cc90d64ae9df",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-tiny.en.bin",
    desc: "very fast but bad accuracy, english only",
  },
  {
    type: "base",
    name: "ggml-base.bin",
    size: "142 MB",
    sha: "465707469ff3a37a2b9b8d8f89f2f99de7299dac",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.bin",
    desc: "fast with decent accuracy",
  },
  {
    type: "base.en",
    name: "ggml-base.en.bin",
    size: "142 MB",
    sha: "137c40403d78fd54d454da0f9bd998f78703390c",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin",
    desc: "fast with decent accuracy",
  },
  {
    type: "small",
    name: "ggml-small.bin",
    size: "466 MB",
    sha: "55356645c2b361a969dfd0ef2c5a50d530afd8d5",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin",
    desc: "normal speed with good accuracy",
  },
  {
    type: "small.en",
    name: "ggml-small.en.bin",
    size: "466 MB",
    sha: "db8a495a91d927739e50b3fc1cc4c6b8f6c2d022",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin",
    desc: "normal speed with good accuracy, english only",
  },
  {
    type: "medium",
    name: "ggml-medium.bin",
    size: "1.5 GB",
    sha: "fd9727b6e1217c2f614f9b698455c4ffd82463b4",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.bin",
    desc: "slow but great accuracy",
  },
  {
    type: "medium.en",
    name: "ggml-medium.en.bin",
    size: "1.5 GB",
    sha: "8c30f0e44ce9560643ebd10bbe50cd20eafd3723",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-medium.en.bin",
    desc: "slow but great accuracy, english only",
  },
  {
    type: "large-v1",
    name: "ggml-large-v1.bin",
    size: "2.9 GB",
    sha: "b1caaf735c4cc1429223d5a74f0f4d0b9b59a299",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v1.bin",
    desc: "very slow but amazing accuracy",
  },
  {
    type: "large-v2",
    name: "ggml-large-v2.bin",
    size: "2.9 GB",
    sha: "0f4c8e34f21cf1a914c59d8b3ce882345ad349d6",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v2.bin",
    desc: "very slow but amazing accuracy",
  },
  {
    type: "large-v3",
    name: "ggml-large-v3.bin",
    size: "2.9 GB",
    sha: "ad82bf6a9043ceed055076d0fd39f5f186ff8062",
    url: "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-large-v3.bin",
    desc: "very slow but amazing accuracy",
  },
];

export const AudioFormats = ["mp3", "wav", "ogg", "flac", "m4a", "wma", "aac"];

export const VideoFormats = ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"];

export const PROCESS_TIMEOUT = 1000 * 60 * 15;

export const RESPONSE_JSON_FORMAT_MODELS = [
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-4-0125-preview",
  "gpt-4-turbo-preview",
  "gpt-4-1106-preview",
];
