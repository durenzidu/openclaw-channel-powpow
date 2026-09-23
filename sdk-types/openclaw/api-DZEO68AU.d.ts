import { _ as Context, a as ProviderModel, c as ProviderRequestTransportOverrides, f as PinnedDispatcherPolicy, h as ModelProviderConfig, i as ProviderContext, m as OpenClawConfig, n as ProviderPlugin, o as ProviderStreamOptions, p as StreamFn, s as VideoContent, v as SimpleStreamOptions } from "./cli-backend.types-DEEWiHUs.js";
import "./provider-model-shared-BhSrEjLw.js";
import { i as GoogleThinkingLevel } from "./provider-stream-shared-BHXfdMYC.js";
import "./provider-http-D7AR5Zvd.js";
import "./provider-onboard-Ovz5soBm.js";
import { isGoogleGemini3FlashModel, isGoogleGemini3ProModel, isGoogleGemini3ThinkingLevelModel } from "@openclaw/ai/internal/google-model-family";
//#region extensions/google/gemini-auth.d.ts
declare function parseGeminiAuth(apiKey: string): {
  headers: Record<string, string>;
};
//#endregion
//#region extensions/google/onboard.d.ts
declare const GOOGLE_GEMINI_DEFAULT_MODEL = "google/gemini-3.1-pro-preview";
declare function applyGoogleGeminiModelDefault(cfg: OpenClawConfig): {
  next: OpenClawConfig;
  changed: boolean;
};
//#endregion
//#region extensions/google/model-id.d.ts
declare function normalizeGoogleModelId(id: string): string;
declare function normalizeAntigravityModelId(id: string): string;
//#endregion
//#region extensions/google/transport-stream.d.ts
type CanonicalGoogleTransportApi = "google-generative-ai" | "google-vertex";
type GoogleTransportApi = CanonicalGoogleTransportApi | "openclaw-google-generative-ai-transport";
type GoogleTransportModel = ProviderModel<GoogleTransportApi> & {
  headers?: Record<string, string>;
  provider: string;
};
type GoogleTransportOptions = SimpleStreamOptions & ProviderStreamOptions & {
  cachedContent?: string;
  toolChoice?: "auto" | "none" | "any" | "required" | {
    type: "function";
    function: {
      name: string;
    };
  };
  thinking?: {
    enabled: boolean;
    budgetTokens?: number;
    level?: GoogleThinkingLevel;
  };
};
type GoogleGenerateContentRequest = {
  cachedContent?: string;
  contents: Array<Record<string, unknown>>;
  generationConfig?: Record<string, unknown>;
  systemInstruction?: Record<string, unknown>;
  tools?: Array<Record<string, unknown>>;
  toolConfig?: Record<string, unknown>;
};
type GoogleVideoSlots = Map<Record<string, unknown>, VideoContent>;
declare function buildGoogleGenerativeAiParams(model: GoogleTransportModel, context: Context | ProviderContext, options?: GoogleTransportOptions, videoSlots?: GoogleVideoSlots): GoogleGenerateContentRequest;
declare function createGoogleGenerativeAiTransportStreamFn(): StreamFn;
//#endregion
//#region extensions/google/src/google-api-base-url.d.ts
declare const DEFAULT_GOOGLE_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
declare function isGoogleVertexHostname(hostname: string): boolean;
declare function isGoogleVertexBaseUrl(baseUrl?: string | null): boolean;
declare function normalizeGoogleApiBaseUrl(baseUrl?: string): string;
declare function isGoogleGenerativeAiApi(api?: string | null): boolean;
declare function normalizeGoogleGenerativeAiBaseUrl(baseUrl?: string): string | undefined;
//#endregion
//#region extensions/google/provider-policy.d.ts
type GoogleApiCarrier = {
  api?: string | null;
};
type GoogleProviderConfigLike = GoogleApiCarrier & {
  baseUrl?: string | null;
  models?: ReadonlyArray<GoogleApiCarrier | null | undefined> | null;
};
declare function resolveGoogleGenerativeAiTransport<TApi extends string | null | undefined>(params: {
  provider?: string;
  api: TApi;
  baseUrl?: string;
}): {
  api: TApi | "google-generative-ai" | "google-vertex";
  baseUrl?: string;
};
declare function resolveGoogleGenerativeAiApiOrigin(baseUrl?: string): string;
declare function shouldNormalizeGoogleGenerativeAiProviderConfig(providerKey: string, provider: GoogleProviderConfigLike): boolean;
declare function shouldNormalizeGoogleProviderConfig(providerKey: string, provider: GoogleProviderConfigLike): boolean;
declare function normalizeGoogleProviderConfig(providerKey: string, provider: ModelProviderConfig): ModelProviderConfig;
//#endregion
//#region extensions/google/gemini-cli-provider.d.ts
declare function buildGoogleGeminiCliProvider(): ProviderPlugin;
//#endregion
//#region extensions/google/provider-registration.d.ts
declare function buildGoogleProvider(): ProviderPlugin;
//#endregion
//#region extensions/google/api.d.ts
type GoogleGenerativeAiRequestOverrides = ProviderRequestTransportOverrides & {
  allowPrivateNetwork?: boolean;
};
declare function resolveGoogleGenerativeAiHttpRequestConfig(params: {
  apiKey: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  request?: GoogleGenerativeAiRequestOverrides;
  capability: "image" | "audio" | "video";
  transport: "http" | "media-understanding";
}): {
  baseUrl: string;
  allowPrivateNetwork: boolean;
  headers: Headers;
  dispatcherPolicy?: PinnedDispatcherPolicy;
};
//#endregion
export { applyGoogleGeminiModelDefault as C, GOOGLE_GEMINI_DEFAULT_MODEL as S, isGoogleGemini3FlashModel as _, resolveGoogleGenerativeAiApiOrigin as a, normalizeAntigravityModelId as b, shouldNormalizeGoogleProviderConfig as c, isGoogleVertexBaseUrl as d, isGoogleVertexHostname as f, createGoogleGenerativeAiTransportStreamFn as g, buildGoogleGenerativeAiParams as h, normalizeGoogleProviderConfig as i, DEFAULT_GOOGLE_API_BASE_URL as l, normalizeGoogleGenerativeAiBaseUrl as m, buildGoogleProvider as n, resolveGoogleGenerativeAiTransport as o, normalizeGoogleApiBaseUrl as p, buildGoogleGeminiCliProvider as r, shouldNormalizeGoogleGenerativeAiProviderConfig as s, resolveGoogleGenerativeAiHttpRequestConfig as t, isGoogleGenerativeAiApi as u, isGoogleGemini3ProModel as v, parseGeminiAuth as w, normalizeGoogleModelId as x, isGoogleGemini3ThinkingLevelModel as y };