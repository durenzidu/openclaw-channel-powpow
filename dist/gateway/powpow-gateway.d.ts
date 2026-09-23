/**
 * PowPow 网关账号生命周期
 * runPassiveAccountLifecycle 包裹：history 轮询 + Supabase Realtime 双链路收信，
 * dispatchInboundDirectDm 分发入站消息，webhook/receive 回信
 */
import type { ChannelPlugin } from "openclaw/plugin-sdk/channel-core";
import type { PowPowAccount } from "../types.js";
type PowpowGatewayContext = Parameters<NonNullable<NonNullable<ChannelPlugin<PowPowAccount>["gateway"]>["startAccount"]>>[0];
export declare function startPowpowGatewayAccount(ctx: PowpowGatewayContext): Promise<void>;
export {};
//# sourceMappingURL=powpow-gateway.d.ts.map