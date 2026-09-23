/**
 * 消息去重器
 * Realtime 与轮询两条链路可能重复投递同一条消息，用消息 ID 去重
 */

export class MessageDedup {
  private readonly seen = new Map<string, number>();
  private readonly maxSize: number;

  constructor(maxSize = 2000) {
    this.maxSize = maxSize;
  }

  /**
   * 标记消息为已见。
   * @returns true 表示首次见到（应处理），false 表示重复（应忽略）
   */
  markSeen(id: string): boolean {
    if (this.seen.has(id)) {
      return false;
    }
    this.seen.set(id, Date.now());
    if (this.seen.size > this.maxSize) {
      this.prune();
    }
    return true;
  }

  has(id: string): boolean {
    return this.seen.has(id);
  }

  private prune(): void {
    // Map 保持插入顺序，删除最旧的一半
    const toDelete = Math.floor(this.seen.size / 2);
    let deleted = 0;
    for (const key of this.seen.keys()) {
      if (deleted >= toDelete) {
        break;
      }
      this.seen.delete(key);
      deleted++;
    }
  }

  clear(): void {
    this.seen.clear();
  }
}
