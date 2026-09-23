import { r as OpenClawConfig } from "./types.openclaw-DRlyXvhd.js";
import "./types-3IrUshX3.js";
//#region src/config/paths.d.ts
declare let STATE_DIR: string;
/** Resolves the legacy credentials directory retained for Doctor and backup ownership. */
declare function resolveOAuthDir(env?: NodeJS.ProcessEnv, stateDir?: string): string;
declare function resolveGatewayPort(cfg?: OpenClawConfig, env?: NodeJS.ProcessEnv): number;
//#endregion
export { resolveGatewayPort as n, resolveOAuthDir as r, STATE_DIR as t };