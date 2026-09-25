/**
 * chat/history 轮询器
 * 插件的唯一收信链路：定期拉取数字人的会话历史，增量分发新出现的用户消息
 */
import { logger } from '../shared/logger.js';
export class HistoryPoller {
    opts;
    timer = null;
    polling = false;
    running = false;
    baselineReady = false;
    constructor(options) {
        this.opts = options;
    }
    /**
     * 建立基线：拉取一次历史并把所有消息 ID 交给回调标记为已见，
     * 避免插件重启后回复历史消息；基线建立前轮询不分发。
     * 基线失败不阻塞启动，改为异步指数退避重试（封顶 30s），
     * 防止首拉失败时把全部历史消息当新消息分发（迟到回复风暴）。
     */
    async start(baselineIds) {
        if (this.running) {
            return;
        }
        this.running = true;
        void this.establishBaseline(baselineIds, 0);
        this.timer = setInterval(() => {
            void this.poll();
        }, this.opts.intervalMs);
    }
    stop() {
        this.running = false;
        this.baselineReady = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    isRunning() {
        return this.running;
    }
    async establishBaseline(baselineIds, delayMs) {
        if (!this.running) {
            return;
        }
        if (delayMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
        if (!this.running) {
            return;
        }
        try {
            const messages = await this.fetchHistory();
            baselineIds(messages.map((m) => m.id));
            this.baselineReady = true;
            logger.debug(`账号 ${this.opts.accountId} 轮询基线建立：${messages.length} 条历史消息`);
        }
        catch (error) {
            const nextDelay = Math.min((delayMs || 1000) * 2, 30000);
            logger.warn(`账号 ${this.opts.accountId} 轮询基线建立失败，${nextDelay}ms 后重试（基线就绪前不分发）:`, error);
            await this.establishBaseline(baselineIds, nextDelay);
        }
    }
    async poll() {
        if (this.polling) {
            return;
        }
        if (!this.baselineReady) {
            return;
        }
        this.polling = true;
        try {
            const messages = await this.fetchHistory();
            const userMessages = messages.filter((m) => m.role === 'user');
            if (userMessages.length > 0) {
                this.opts.onUserMessages(userMessages);
            }
        }
        catch (error) {
            logger.debug(`账号 ${this.opts.accountId} 轮询失败:`, error);
            this.opts.onError?.(error);
        }
        finally {
            this.polling = false;
        }
    }
    /**
     * chat/history 按 asc + limit 排序，直接拉取会得到最旧的 N 条。
     * 两步取最新：先以 limit=1 探总量，再以 offset=max(0, total-limit) 拉最新一段。
     */
    async fetchHistory() {
        const base = this.opts.apiBaseUrl.replace(/\/+$/, '') + '/api/openclaw/chat/history';
        const dhParam = `digitalHumanId=${encodeURIComponent(this.opts.digitalHumanId)}`;
        const total = await this.fetchTotal(base, dhParam);
        if (total === 0) {
            return [];
        }
        const limit = Math.min(this.opts.limit, total);
        const offset = Math.max(0, total - limit);
        const json = await this.fetchPage(base, dhParam, limit, offset);
        if (!json.success || !json.data?.messages || !Array.isArray(json.data.messages)) {
            throw new Error(json.error || 'chat/history 响应格式异常');
        }
        return json.data.messages;
    }
    async fetchTotal(base, dhParam) {
        const json = await this.fetchPage(base, dhParam, 1, 0);
        if (!json.success || !json.data?.pagination) {
            throw new Error(json.error || 'chat/history 响应格式异常');
        }
        return json.data.pagination.total || 0;
    }
    async fetchPage(base, dhParam, limit, offset) {
        const url = `${base}?${dhParam}&limit=${limit}&offset=${offset}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.opts.requestTimeoutMs);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                signal: controller.signal,
            });
            if (!response.ok) {
                throw new Error(`chat/history HTTP ${response.status}`);
            }
            return (await response.json());
        }
        finally {
            clearTimeout(timeout);
        }
    }
}
//# sourceMappingURL=history-poller.js.map