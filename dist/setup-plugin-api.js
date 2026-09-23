/**
 * PowPow setup 插件（dist/setup-plugin-api.js）
 * 仅供 setup 向导/CLI 使用：元数据 + setup 契约 + 只读配置访问
 */
import { buildChannelConfigSchema, } from "openclaw/plugin-sdk/channel-core";
import { describeAccountSnapshot } from "openclaw/plugin-sdk/account-helpers";
import { PowPowConfigSchema } from "./config-schema.js";
import { listPowpowAccountIds, resolveDefaultPowpowAccountId, resolvePowpowAccount, } from "./account.js";
import { createPowpowSetupAdapter, createPowpowSetupContract } from "./setup.js";
export const powpowSetupPlugin = {
    id: "powpow",
    meta: {
        id: "powpow",
        label: "PowPow",
        selectionLabel: "PowPow",
        docsPath: "/channels/powpow",
        docsLabel: "powpow",
        blurb: "Chat as a PowPow map digital human",
        order: 100,
    },
    capabilities: {
        chatTypes: ["direct"],
        media: false,
    },
    reload: { configPrefixes: ["channels.powpow"] },
    configSchema: buildChannelConfigSchema(PowPowConfigSchema),
    setupContract: createPowpowSetupContract(createPowpowSetupAdapter({
        resolveAccountId: (cfg, accountId) => accountId?.trim() || resolveDefaultPowpowAccountId(cfg),
    })),
    config: {
        listAccountIds: listPowpowAccountIds,
        resolveAccount: (cfg, accountId) => resolvePowpowAccount({ cfg, accountId }),
        defaultAccountId: resolveDefaultPowpowAccountId,
        isConfigured: (account) => account.configured,
        describeAccount: (account) => describeAccountSnapshot({
            account,
            configured: account.configured,
            extra: { digitalHumanId: account.digitalHumanId },
        }),
    },
};
//# sourceMappingURL=setup-plugin-api.js.map