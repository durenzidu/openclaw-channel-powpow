import { P as SecretInput, R as isSecretRef, c as normalizeResolvedSecretInputString, l as normalizeSecretInputString, n as SecretInputStringResolution, o as coerceSecretRef, r as SecretInputStringResolutionMode, s as hasConfiguredSecretInput, u as resolveSecretInputString } from "../types.secrets-BuGeX7LK.js";
import { n as resolveConfiguredSecretInputWithFallback, r as resolveRequiredConfiguredSecretRefInputString, t as resolveConfiguredSecretInputString } from "../resolve-configured-secret-input-string-DGNGnOxw.js";
//#region src/plugin-sdk/secret-input-runtime.d.ts
/** Reject use of a manifest-owned plugin capability whose startup secret is unavailable. */
export declare function assertPluginCapabilitySecretAvailable(ownerId: string): void;
//#endregion
export { type SecretInput, type SecretInputStringResolution, type SecretInputStringResolutionMode, coerceSecretRef, hasConfiguredSecretInput, isSecretRef, normalizeResolvedSecretInputString, normalizeSecretInputString, resolveConfiguredSecretInputString, resolveConfiguredSecretInputWithFallback, resolveRequiredConfiguredSecretRefInputString, resolveSecretInputString };