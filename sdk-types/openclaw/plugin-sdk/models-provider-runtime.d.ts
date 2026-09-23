import { a as formatModelsAvailableHeader, i as buildPreparedModelsProviderData, n as ModelsProviderData, o as getModelsRuntimeChoices, r as ModelsRuntimeChoice, s as resolveModelsCommandReply, t as MODEL_PICKER_CHANGED_MESSAGE } from "../commands-models-CxbjLRon.js";
//#region src/plugin-sdk/models-provider-runtime.d.ts
export declare function buildModelsProviderData(...args: Parameters<typeof buildPreparedModelsProviderData>): Promise<ModelsProviderData>;
//#endregion
export { MODEL_PICKER_CHANGED_MESSAGE, type ModelsProviderData, type ModelsRuntimeChoice, buildPreparedModelsProviderData, formatModelsAvailableHeader, getModelsRuntimeChoices, resolveModelsCommandReply };