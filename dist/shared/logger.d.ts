/**
 * 日志工具
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
declare class PowPowLogger {
    private level;
    private readonly prefix;
    setLevel(level: LogLevel): void;
    private shouldLog;
    private format;
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
}
export declare const logger: PowPowLogger;
export {};
//# sourceMappingURL=logger.d.ts.map