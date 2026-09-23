/**
 * Stub of openclaw/plugin-sdk/channel-outbound
 * runPassiveAccountLifecycle: keep account alive until abortSignal fires,
 * then invoke the returned stop(). Contract per SDK d.ts.
 */
export async function runPassiveAccountLifecycle({ abortSignal, start }) {
  const handle = await start();
  if (!abortSignal) {
    return;
  }
  await new Promise((resolve) => {
    if (abortSignal.aborted) {
      resolve(undefined);
      return;
    }
    abortSignal.addEventListener("abort", () => resolve(undefined), { once: true });
  });
  await handle?.stop?.();
}
