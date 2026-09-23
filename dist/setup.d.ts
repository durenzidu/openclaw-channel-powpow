/**
 * PowPow setup 适配器 + setup 契约
 * 提供 `openclaw channel setup powpow --digital-human-id ...` CLI 字段
 */
import type { OpenClawConfig } from "openclaw/plugin-sdk/channel-core";
export interface PowpowSetupInput {
    name?: string;
    digitalHumanId?: string;
    webhookToken?: string;
    useEnvToken?: boolean;
    apiBaseUrl?: string;
    supabaseUrl?: string;
    supabaseAnonKey?: string;
}
export declare function createPowpowSetupAdapter(params: {
    resolveAccountId: (cfg: OpenClawConfig, accountId?: string) => string;
}): {
    resolveAccountId: (input: {
        cfg: OpenClawConfig;
        accountId?: string;
    }) => string;
    applyAccountName: (input: {
        cfg: OpenClawConfig;
        accountId: string;
        name?: string;
    }) => OpenClawConfig;
    validateInput: (input: {
        cfg: OpenClawConfig;
        accountId: string;
        input: PowpowSetupInput;
    }) => string | null;
    applyAccountConfig: (input: {
        cfg: OpenClawConfig;
        accountId: string;
        input: PowpowSetupInput;
    }) => OpenClawConfig;
};
export declare function createPowpowSetupContract(adapter: ReturnType<typeof createPowpowSetupAdapter>): import("openclaw/manifest-registry-REO5D6i-.js").l;
//# sourceMappingURL=setup.d.ts.map