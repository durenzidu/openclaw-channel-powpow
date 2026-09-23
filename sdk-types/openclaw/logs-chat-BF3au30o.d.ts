import { Static, Type } from "typebox";
//#region packages/gateway-protocol/src/schema/logs-chat.d.ts
declare const QUEUE_MODES: readonly ["steer", "followup", "collect", "interrupt"];
type QueueMode = (typeof QUEUE_MODES)[number];
//#endregion
export { QueueMode as t };