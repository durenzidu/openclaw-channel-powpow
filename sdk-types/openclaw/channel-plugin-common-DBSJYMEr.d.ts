import "./agent-harness-runtime-D1Ww9PgY.js";
import { n as ChatChannelId } from "./channel-id.types-CjcGKHk0.js";
import { x as ChannelMeta } from "./types.core-D41vZ0PO.js";
import "./types.plugin-BovxZMna.js";
import "./types.public-DyN6AInF.js";
import "./config-schema-C27HzEVf.js";
import "./setup-helpers-DVxqIPuo.js";
import "./config-helpers-A0Pcht-G.js";
import "./helpers-Zx-X_EgU.js";
//#region src/channels/chat-meta-shared.d.ts
/**
 * Metadata shown for built-in chat channels in setup, status, and selection UIs.
 */
type ChatChannelMeta = ChannelMeta;
//#endregion
//#region src/channels/chat-meta.d.ts
/**
 * Returns metadata for one built-in chat channel id.
 * Shipped plugin-SDK contract: callers pass bundled ids, so absence is an invariant
 * violation; drift-tolerant core paths use findChatChannelMeta instead.
 */
declare function getChatChannelMeta(id: ChatChannelId): ChatChannelMeta;
//#endregion
export { getChatChannelMeta as t };