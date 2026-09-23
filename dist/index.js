/**
 * PowPow Channel 入口（dist/index.js）
 * defineBundledChannelEntry：host 通过该契约加载 ./channel-plugin-api.js 的 powpowPlugin
 */
import { defineBundledChannelEntry } from "openclaw/plugin-sdk/channel-entry-contract";
const powpowEntry = defineBundledChannelEntry({
    id: "powpow",
    name: "PowPow",
    description: "PowPow map digital-human chat channel (Supabase Realtime + history polling inbound, webhook reply outbound).",
    importMetaUrl: import.meta.url,
    plugin: {
        specifier: "./channel-plugin-api.js",
        exportName: "powpowPlugin",
    },
});
export default powpowEntry;
//# sourceMappingURL=index.js.map