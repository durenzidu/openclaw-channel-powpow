import "./agent-harness-runtime-D1Ww9PgY.js";
import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { j as SessionEntry } from "./templating-BzAleqvS.js";
import { f as ReplyPayload } from "./reply-payload-BCm_-KEH.js";
import { d as ModelCatalogEntry } from "./model-selection-CpOQi1Qo.js";
//#region src/auto-reply/reply/commands-models.d.ts
declare const MODEL_PICKER_CHANGED_MESSAGE = "Available models changed. Open /models and choose again.";
type ModelsCommandSessionEntry = Partial<Pick<SessionEntry, "authProfileOverride" | "authProfileOverrideSource" | "modelProvider" | "providerOverride" | "model" | "modelSelectionLocked" | "agentRuntimeOverride">>;
type ModelsProviderData = {
  byProvider: Map<string, Set<string>>;
  pendingProviders?: readonly string[];
  providers: string[];
  resolvedDefault: {
    provider: string;
    model: string;
  };
  modelNames: Map<string, string>;
  modelMenu?: {
    modelNames: ReadonlyMap<string, string>;
    byProvider: ReadonlyMap<string, ModelsProviderMenu>;
  };
  refreshWarning?: string;
  runtimeChoicesByProvider?: Map<string, ModelsRuntimeChoice[]>;
  runtimeChoicesByModel?: Map<string, ModelsRuntimeChoice[]>;
  isCurrent?: () => boolean;
};
type ModelsProviderMenu = {
  available: number;
  notice: string;
};
type PreparedModelsProviderData = ModelsProviderData & {
  modelCatalog: ModelCatalogEntry[];
};
type ModelsBrowseOptions = {
  view?: "default" | "all";
  workspaceDir?: string;
  sessionEntry?: ModelsCommandSessionEntry;
};
type ModelsRuntimeChoice = {
  id: string;
  label: string;
  description: string;
};
/** Undefined is unknown; an empty list is an authoritative refusal. */
declare function getModelsRuntimeChoices(data: ModelsProviderData, provider: string, model?: string): ModelsRuntimeChoice[] | undefined;
declare function buildPreparedModelsProviderData(cfg: OpenClawConfig, agentId?: string, options?: ModelsBrowseOptions): Promise<PreparedModelsProviderData>;
declare function formatModelsAvailableHeader(params: {
  provider: string;
  total: number;
  cfg: OpenClawConfig;
  agentId?: string;
  agentDir?: string;
  workspaceDir?: string;
  sessionEntry?: ModelsCommandSessionEntry;
  availability?: ModelsProviderMenu;
}): string;
type ModelsCommandReplyParams = {
  cfg: OpenClawConfig;
  commandBodyNormalized: string;
  surface?: string;
  currentModel?: string;
  agentId?: string;
  agentDir?: string;
  workspaceDir?: string;
  sessionEntry?: ModelsCommandSessionEntry;
};
declare function resolveModelsCommandReply(params: ModelsCommandReplyParams): Promise<ReplyPayload | null>;
//#endregion
export { formatModelsAvailableHeader as a, buildPreparedModelsProviderData as i, ModelsProviderData as n, getModelsRuntimeChoices as o, ModelsRuntimeChoice as r, resolveModelsCommandReply as s, MODEL_PICKER_CHANGED_MESSAGE as t };