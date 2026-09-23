import { $a as ProviderPlugin, Ai as PluginLoadOptions, ki as augmentModelCatalogWithProviderPlugins, mi as resolvePluginProvidersCore, pi as isPluginProvidersLoadInFlight } from "../agent-harness-runtime-D1Ww9PgY.js";
import "../types.openclaw-DRlyXvhd.js";
import { S as InstalledPluginIndex, y as PluginMetadataSnapshot } from "../io-BLJj5WUL.js";
import { n as PluginManifestRegistry } from "../manifest-registry-REO5D6i-.js";
import "../config-normalization-shared-DDkPS3uc.js";
//#region src/plugins/plugin-registry-snapshot.d.ts
type PluginRegistrySnapshot = InstalledPluginIndex;
//#endregion
//#region src/plugins/providers.d.ts
type ProviderManifestLoadParams = {
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  registry?: PluginRegistrySnapshot;
  manifestRegistry?: PluginManifestRegistry;
  metadataSnapshot?: Pick<PluginMetadataSnapshot, "manifestRegistry"> & Partial<Pick<PluginMetadataSnapshot, "owners" | "byPluginId">>;
};
type ProviderOwnershipLookupParams = {
  provider: string;
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  manifestRegistry?: PluginManifestRegistry;
  metadataSnapshot?: Pick<PluginMetadataSnapshot, "owners" | "manifestRegistry" | "byPluginId">;
};
export declare function resolveOwningPluginIdsForProvider(params: ProviderOwnershipLookupParams): string[] | undefined;
export declare function resolveCatalogHookProviderPluginIds(params: {
  config?: PluginLoadOptions["config"];
  workspaceDir?: string;
  env?: PluginLoadOptions["env"];
  metadataSnapshot?: ProviderManifestLoadParams["metadataSnapshot"];
}): string[];
//#endregion
//#region src/plugin-sdk/provider-catalog-runtime.d.ts
/** Bare provider callbacks retain borrowed resources until their SDK host closes. */
declare function resolvePluginProvidersForSdk(params: Parameters<typeof resolvePluginProvidersCore>[0]): ProviderPlugin[];
//#endregion
export { augmentModelCatalogWithProviderPlugins, isPluginProvidersLoadInFlight, resolvePluginProvidersForSdk as resolvePluginProviders };