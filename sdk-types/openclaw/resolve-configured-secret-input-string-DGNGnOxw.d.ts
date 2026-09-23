import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import { n as PluginManifestRegistry } from "./manifest-registry-REO5D6i-.js";
//#region src/gateway/resolve-configured-secret-input-string.d.ts
type SecretInputUnresolvedReasonStyle = "generic" | "detailed";
type ConfiguredSecretInputSource = "config" | "secretRef" | "fallback";
type ConfiguredSecretInputParams = {
  config: OpenClawConfig;
  env: NodeJS.ProcessEnv;
  value: unknown;
  path: string;
  manifestRegistry?: Pick<PluginManifestRegistry, "plugins">;
  unresolvedReasonStyle?: SecretInputUnresolvedReasonStyle;
};
declare function resolveConfiguredSecretInputString(params: ConfiguredSecretInputParams): Promise<{
  value?: string;
  unresolvedRefReason?: string;
}>;
declare function resolveConfiguredSecretInputWithFallback(params: ConfiguredSecretInputParams & {
  readFallback?: () => string | undefined;
}): Promise<{
  value?: string;
  source?: ConfiguredSecretInputSource;
  unresolvedRefReason?: string;
  secretRefConfigured: boolean;
}>;
declare function resolveRequiredConfiguredSecretRefInputString(params: ConfiguredSecretInputParams): Promise<string | undefined>;
//#endregion
export { resolveConfiguredSecretInputWithFallback as n, resolveRequiredConfiguredSecretRefInputString as r, resolveConfiguredSecretInputString as t };