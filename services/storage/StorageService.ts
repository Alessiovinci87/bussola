import type { StorageAdapter } from './types';
import { AsyncStorageAdapter } from './AsyncStorageAdapter';

class StorageService {
  private adapter: StorageAdapter;

  constructor(adapter: StorageAdapter) {
    this.adapter = adapter;
  }

  get<T>(key: string): Promise<T | null> {
    return this.adapter.get<T>(key);
  }

  set<T>(key: string, value: T): Promise<void> {
    return this.adapter.set<T>(key, value);
  }

  remove(key: string): Promise<void> {
    return this.adapter.remove(key);
  }

  getAllByPrefix<T>(prefix: string): Promise<T[]> {
    return this.adapter.getAllByPrefix<T>(prefix);
  }

  clear(): Promise<void> {
    return this.adapter.clear();
  }
}

export const storageService = new StorageService(new AsyncStorageAdapter());
