//#region src/infra/cli-root-options.d.ts
/** CLI token that stops root option scanning and leaves following args positional. */
export declare const FLAG_TERMINATOR = "--";
/** Returns whether a token can be consumed as a root option value. */
export declare function isValueToken(arg: string | undefined): boolean;
/** Count root-option tokens conservatively for route matching. */
export declare function consumeRootOptionToken(args: ReadonlyArray<string>, index: number): number;
/** Read positional command tokens while accepting root options at any pre-terminator position. */
export declare function getRootOptionAwareCommandPath(argv: readonly string[], depth: number): string[];
//#endregion