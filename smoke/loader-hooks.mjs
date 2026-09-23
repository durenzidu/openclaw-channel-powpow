const STUB_MAP = {
  "openclaw/plugin-sdk/channel-outbound": "./stubs/channel-outbound.mjs",
  "openclaw/plugin-sdk/channel-ingress-runtime": "./stubs/channel-ingress-runtime.mjs",
  "openclaw/plugin-sdk/channel-inbound": "./stubs/channel-inbound.mjs",
  "openclaw/plugin-sdk/gateway-runtime": "./stubs/gateway-runtime.mjs",
  "openclaw/plugin-sdk/text-chunking": "./stubs/text-chunking.mjs",
};

export async function resolve(specifier, context, nextResolve) {
  const mapped = STUB_MAP[specifier];
  if (mapped) {
    return { url: new URL(mapped, import.meta.url).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
