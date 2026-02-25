export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  getAllByPrefix<T>(prefix: string): Promise<T[]>;
  clear(): Promise<void>;
}
