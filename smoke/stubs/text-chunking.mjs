/**
 * Stub of openclaw/plugin-sdk/text-chunking
 * Simplified but contract-compatible text helpers for the smoke test.
 */
export function sanitizeAssistantVisibleText(text) {
  if (typeof text !== "string") {
    return "";
  }
  return text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim();
}

export function stripMarkdown(text) {
  if (typeof text !== "string") {
    return "";
  }
  return text
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*\n?|```/g, ""))
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .trim();
}
