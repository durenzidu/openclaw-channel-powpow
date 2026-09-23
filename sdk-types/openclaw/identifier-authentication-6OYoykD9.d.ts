//#region src/channels/message-access/identifier-authentication.d.ts
/** Ordered strength of one identifier-authentication claim. */
type IdentifierAuthentication = "verified" | "asserted" | "unverified" | "mutable";
declare function meetsIdentifierAuthentication(actual: IdentifierAuthentication, minimum: IdentifierAuthentication): boolean;
//#endregion
export { meetsIdentifierAuthentication as n, IdentifierAuthentication as t };