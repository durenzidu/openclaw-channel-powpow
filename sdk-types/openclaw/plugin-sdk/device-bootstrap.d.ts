import { a as PairedDeviceApprovalKind, c as DeviceBootstrapProfileInput, d as normalizeDeviceBootstrapProfile, i as PairedDevice, l as DeviceBootstrapPurpose, n as DeviceBootstrapTokenRecord, o as BOOTSTRAP_HANDOFF_OPERATOR_SCOPES, r as DevicePairingPendingRequest, s as DeviceBootstrapProfile, t as listDevicePairing, u as PAIRING_SETUP_BOOTSTRAP_PROFILE } from "../device-pairing-BWyHU1n8.js";
//#region src/infra/device-pairing-approval.d.ts
/** Paired-device access metadata refreshed when an existing device reconnects. */
type DevicePairingAccessMetadata = Pick<PairedDevice, "displayName" | "remoteIp" | "lastSeenAtMs" | "lastSeenReason">;
/** Authorization failure categories for owner approval and bootstrap approval flows. */
type DevicePairingForbiddenReason = "caller-scopes-required" | "caller-missing-scope" | "scope-outside-requested-roles" | "approval-policy-changed" | "bootstrap-role-not-allowed" | "bootstrap-scope-not-allowed";
/** Structured forbidden result with the missing/disallowed role or scope when known. */
type DevicePairingForbiddenResult = {
  status: "forbidden";
  reason: DevicePairingForbiddenReason;
  scope?: string;
  role?: string;
};
/** Pairing approval outcome: approved, forbidden with reason, or request not found. */
type ApproveDevicePairingResult = {
  status: "approved";
  requestId: string;
  device: PairedDevice;
  /** Existing connected node transports must be retired before success is returned. */
  nodePairingGenerationChanged?: true;
} | DevicePairingForbiddenResult | null;
type DevicePairingApprovalOptions = {
  callerScopes?: readonly string[];
  accessMetadata?: DevicePairingAccessMetadata;
  approvedVia?: Extract<PairedDeviceApprovalKind, "owner" | "silent" | "trusted-cidr" | "trusted-proxy" | "ssh-verified">;
  /** Revalidate automatic approval against current policy after all pairing-lock awaits. */
  isApprovalCurrent?: (state: {
    pending: Readonly<DevicePairingPendingRequest>;
    existing: Readonly<PairedDevice> | undefined;
  }) => boolean;
  /**
   * Replace pending scopes for a new operator device, or a trusted-proxy
   * same-key upgrade. The live role set is rechecked under the pairing lock.
   */
  autoApproveNewDeviceScopes?: readonly string[];
};
/** Approve a pending request with optional caller-scope checks for operator grants. */
export declare function approveDevicePairing(requestId: string, baseDir?: string): Promise<ApproveDevicePairingResult>;
export declare function approveDevicePairing(requestId: string, options: DevicePairingApprovalOptions, baseDir?: string): Promise<ApproveDevicePairingResult>;
//#endregion
//#region src/infra/device-bootstrap.d.ts
type DeviceBootstrapTokenIssueParams = {
  baseDir?: string;
  profile?: DeviceBootstrapProfileInput;
  roles?: readonly string[];
  scopes?: readonly string[];
};
/** Issue a short-lived generic bootstrap token with a bounded role/scope handoff profile. */
export declare function issueDeviceBootstrapToken(params?: DeviceBootstrapTokenIssueParams): Promise<{
  token: string;
  expiresAtMs: number;
}>;
/** Remove every outstanding bootstrap token from the pairing state file. */
export declare function clearDeviceBootstrapTokens(params?: {
  baseDir?: string;
}): Promise<{
  removed: number;
}>;
/** Revoke one bootstrap token and return its record for best-effort restore flows. */
export declare function revokeDeviceBootstrapToken(params: {
  token: string;
  baseDir?: string;
}): Promise<{
  removed: boolean;
  record?: DeviceBootstrapTokenRecord;
}>;
//#endregion
export { BOOTSTRAP_HANDOFF_OPERATOR_SCOPES, type DeviceBootstrapProfile, type DeviceBootstrapProfileInput, type DeviceBootstrapPurpose, PAIRING_SETUP_BOOTSTRAP_PROFILE, listDevicePairing, normalizeDeviceBootstrapProfile };