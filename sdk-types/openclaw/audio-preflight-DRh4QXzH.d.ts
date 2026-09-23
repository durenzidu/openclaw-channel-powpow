import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import "./types-3IrUshX3.js";
import { l as RuntimeMsgContext } from "./templating-BzAleqvS.js";
import { l as MediaUnderstandingProvider } from "./types-4lx-byZG.js";
import { l as ActiveMediaModel } from "./runtime-types-C8EUnxs9.js";
//#region src/media-understanding/audio-preflight.d.ts
/**
 * Transcribes the first audio attachment BEFORE mention checking.
 * This allows voice notes to be processed in group chats with requireMention: true.
 * Returns the transcript or undefined if transcription fails or no audio is found.
 */
declare function transcribeFirstAudio(params: {
  ctx: RuntimeMsgContext;
  cfg: OpenClawConfig;
  agentDir?: string;
  providers?: Record<string, MediaUnderstandingProvider>;
  activeModel?: ActiveMediaModel;
}): Promise<string | undefined>;
//#endregion
export { transcribeFirstAudio as t };