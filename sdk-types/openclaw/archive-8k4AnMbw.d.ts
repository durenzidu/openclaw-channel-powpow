import "./fs-safe-defaults-ypw0M2Xi.js";
import { ARCHIVE_LIMIT_ERROR_CODE, ArchiveEntryKind, ArchiveExtractLimits, ArchiveLimitError, ExtractArchiveOptions, ExtractArchiveOptions as ExtractArchiveOptions$1, inspectTarArchive, readArchiveEntry } from "@openclaw/fs-safe/archive";
//#region src/infra/archive.d.ts
/** Retain OpenClaw's durable publication default; disposable extraction opts out explicitly. */
declare function extractArchive(params: ExtractArchiveOptions): Promise<void>;
//#endregion
export { ExtractArchiveOptions$1 as a, readArchiveEntry as c, ArchiveLimitError as i, ArchiveEntryKind as n, extractArchive as o, ArchiveExtractLimits as r, inspectTarArchive as s, ARCHIVE_LIMIT_ERROR_CODE as t };