/**
 * 日志工具
 */
const LEVEL_ORDER = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};
class PowPowLogger {
    level = 'info';
    prefix = '[powpow-channel]';
    setLevel(level) {
        this.level = level;
    }
    shouldLog(level) {
        return LEVEL_ORDER[level] >= LEVEL_ORDER[this.level];
    }
    format(args) {
        return args
            .map((arg) => {
            if (arg instanceof Error) {
                return arg.message;
            }
            if (typeof arg === 'object' && arg !== null) {
                try {
                    return JSON.stringify(arg);
                }
                catch {
                    return String(arg);
                }
            }
            return String(arg);
        })
            .join(' ');
    }
    debug(...args) {
        if (this.shouldLog('debug')) {
            console.log(this.prefix, this.format(args));
        }
    }
    info(...args) {
        if (this.shouldLog('info')) {
            console.log(this.prefix, this.format(args));
        }
    }
    warn(...args) {
        if (this.shouldLog('warn')) {
            console.warn(this.prefix, this.format(args));
        }
    }
    error(...args) {
        if (this.shouldLog('error')) {
            console.error(this.prefix, this.format(args));
        }
    }
}
export const logger = new PowPowLogger();
//# sourceMappingURL=logger.js.map