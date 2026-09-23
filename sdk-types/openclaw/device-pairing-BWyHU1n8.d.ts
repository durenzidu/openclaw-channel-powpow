import { t as NodeHostStats } from "./node-host-stats-Pu9TCih-.js";
//#region src/shared/device-bootstrap-profile.d.ts
/** Closed purpose codes carried by specialized bootstrap tokens. */
type DeviceBootstrapPurpose = "control-ui" | "control-ui-owner" | "mobile-full" | "voice-node" | "cloud-worker";
/** Normalized roles/scopes carried by a bootstrap token during device handoff. */
type DeviceBootstrapProfile = {
  roles: string[];
  scopes: string[];
  purpose?: DeviceBootstrapPurpose;
};
/** Caller-provided bootstrap profile before role/scope normalization and bounding. */
type DeviceBootstrapProfileInput = {
  roles?: readonly string[];
  scopes?: readonly string[];
  purpose?: DeviceBootstrapPurpose;
};
/** Operator scopes allowed to cross the short-lived bootstrap handoff boundary. */
declare const BOOTSTRAP_HANDOFF_OPERATOR_SCOPES: readonly ["operator.approvals", "operator.questions", "operator.read", "operator.talk.secrets", "operator.write"];
/** Existing least-privilege setup-code/QR profile. */
declare const PAIRING_SETUP_BOOTSTRAP_PROFILE: DeviceBootstrapProfile;
/** Normalize caller-provided bootstrap roles/scopes without applying handoff bounds. */
declare function normalizeDeviceBootstrapProfile(input: DeviceBootstrapProfileInput | undefined): DeviceBootstrapProfile;
//#endregion
//#region src/infra/device-pairing.types.d.ts
/** Pending device pairing request awaiting owner approval. */
type DevicePairingPendingRequest = {
  requestId: string;
  deviceId: string;
  publicKey: string;
  displayName?: string;
  platform?: string;
  deviceFamily?: string;
  clientId?: string;
  clientMode?: string;
  browserOrigin?: string;
  role?: string;
  roles?: string[];
  scopes?: string[];
  remoteIp?: string;
  silent?: boolean;
  isRepair?: boolean;
  ts: number;
};
/** Bearer token issued to one paired device role. */
type DeviceAuthToken = {
  token: string;
  role: string;
  scopes: string[];
  issuer?: {
    kind: "shared-gateway-auth";
    generation: string;
  };
  createdAtMs: number;
  rotatedAtMs?: number;
  revokedAtMs?: number;
  lastUsedAtMs?: number;
};
/**
 * How the latest pairing approval was granted. "silent" is a same-host local
 * policy approval and the only prune-eligible kind: local clients re-pair
 * silently and cannot collide with another machine's records. "trusted-cidr"
 * and "ssh-verified" are also non-interactive but cross hosts, so they are
 * never pruned automatically (display metadata is not a machine identity).
 * "trusted-proxy" records were approved from an authenticated proxy identity.
 * "owner" and "bootstrap" approvals required a user action. None of these
 * cross-host or interactive approval kinds are pruned automatically.
 */
type PairedDeviceApprovalKind = "owner" | "silent" | "trusted-cidr" | "trusted-proxy" | "ssh-verified" | "bootstrap";
/**
 * Approved node capability surface for a node-role device. Device pairing
 * grants connection auth; this grants command/capability exposure (node
 * command gating). displayName here is the operator-facing node name set at
 * approval or via node.rename; it must not be clobbered by reconnect
 * metadata refreshes, which is why it lives apart from the device fields.
 */
type PairedDeviceNodeSurface = {
  displayName?: string;
  version?: string;
  coreVersion?: string;
  uiVersion?: string;
  modelIdentifier?: string;
  caps?: string[];
  commands?: string[];
  permissions?: Record<string, boolean>;
  bins?: string[];
  /** Last current-generation runner publication explicitly enabled session hosting. */
  sessionHost?: boolean;
  createdAtMs: number;
  approvedAtMs: number;
  lastConnectedAtMs?: number;
  lastDisconnectedAtMs?: number;
  lastHostStats?: NodeHostStats;
};
/**
 * Pending node-surface approval awaiting an operator decision (one per
 * device). Carries its own metadata snapshot so approval UIs can show what
 * the node declared at request time. `revision` guards the reconnect-vs-
 * approve race: reconnect cleanup only deletes the revision it observed, so
 * a refreshed request survives concurrent approval flows.
 */
type PairedDevicePendingNodeSurface = {
  requestId: string;
  revision: string;
  displayName?: string;
  platform?: string;
  version?: string;
  coreVersion?: string;
  uiVersion?: string;
  clientId?: string;
  clientMode?: string;
  deviceFamily?: string;
  modelIdentifier?: string;
  caps?: string[];
  commands?: string[];
  permissions?: Record<string, boolean>;
  remoteIp?: string;
  silent?: boolean;
  ts: number;
};
/** Persisted approved device record, including durable approval and active role tokens. */
type PairedDevice = {
  deviceId: string;
  publicKey: string;
  displayName?: string;
  operatorLabel?: string;
  platform?: string;
  deviceFamily?: string;
  clientId?: string;
  clientMode?: string;
  browserOrigin?: string;
  role?: string;
  roles?: string[];
  scopes?: string[];
  approvedScopes?: string[];
  remoteIp?: string;
  tokens?: Record<string, DeviceAuthToken>;
  approvedVia?: PairedDeviceApprovalKind;
  nodeSurface?: PairedDeviceNodeSurface;
  pendingNodeSurface?: PairedDevicePendingNodeSurface;
  createdAtMs: number;
  approvedAtMs: number;
  lastSeenAtMs?: number;
  lastSeenReason?: string;
};
/** Persisted bootstrap token state, including binding and role/scope redemption progress. */
type DeviceBootstrapTokenRecord = {
  token: string;
  setupId?: string;
  ts: number;
  deviceId?: string;
  publicKey?: string;
  profile?: DeviceBootstrapProfile;
  redeemedProfile?: DeviceBootstrapProfile;
  pendingProfile?: DeviceBootstrapProfile;
  issuedAtMs: number;
  lastUsedAtMs?: number;
};
//#endregion
//#region src/infra/device-pairing.d.ts
/** Combined pending/paired view returned by pairing list APIs. */
type DevicePairingList = {
  pending: DevicePairingPendingRequest[];
  paired: PairedDevice[];
};
declare function listDevicePairing(baseDir?: string): Promise<DevicePairingList>;
//#endregion
export { PairedDeviceApprovalKind as a, DeviceBootstrapProfileInput as c, normalizeDeviceBootstrapProfile as d, PairedDevice as i, DeviceBootstrapPurpose as l, DeviceBootstrapTokenRecord as n, BOOTSTRAP_HANDOFF_OPERATOR_SCOPES as o, DevicePairingPendingRequest as r, DeviceBootstrapProfile as s, listDevicePairing as t, PAIRING_SETUP_BOOTSTRAP_PROFILE as u };