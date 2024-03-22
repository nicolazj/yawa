


export type WhisperConfigType = {
    service: "local" | "azure" | "cloudflare" | "openai";
    modelsPath: string;
    model: string;
    ready?: boolean;
  };
  
  export type WhisperOutputType = {
    engine?: string;
    model: {
      audio?: {
        cts: number;
        head: number;
        layer: number;
        state: number;
      };
      ftype?: number;
      mels?: number;
      multilingual?: number;
      text?: {
        cts: number;
        head: number;
        layer: number;
        state: number;
      };
      type: string;
      vocab?: number;
    };
    params: {
      language: string;
      model: string;
      translate: boolean;
    };
    result: {
      languate: string;
    };
    systeminfo: string;
    transcription: TranscriptionResultSegmentType[];
  };
  
  export type TranscriptionType = {
    id: string;
    targetId: string;
    targetType: string;
    state: "pending" | "processing" | "finished";
    engine: string;
    model: string;
    result: TranscriptionResultSegmentGroupType[];
  };
  
  export type TranscriptionResultSegmentType = {
    offsets: {
      from: number;
      to: number;
    };
    text: string;
    timestamps: {
      from: string;
      to: string;
    };
  };
  
  type TranscriptionResultSegmentGroupType = TranscriptionResultSegmentType & {
    segments: TranscriptionResultSegmentType[];
  };