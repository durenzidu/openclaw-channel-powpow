/**
 * PowPow Channel setup 入口（dist/setup-entry.js）
 */

import { defineBundledChannelSetupEntry } from "openclaw/plugin-sdk/channel-entry-contract";

const powpowSetupEntry = defineBundledChannelSetupEntry({
  importMetaUrl: import.meta.url,
  plugin: {
    specifier: "./setup-plugin-api.js",
    exportName: "powpowSetupPlugin",
  },
});

export default powpowSetupEntry;
