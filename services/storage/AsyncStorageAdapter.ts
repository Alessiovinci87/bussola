import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StorageAdapter } from './types';

export class AsyncStorageAdapter implements StorageAdapter {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  }

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async getAllByPrefix<T>(prefix: string): Promise<T[]> {
    const allKeys = await AsyncStorage.getAllKeys();
    const matching = allKeys.filter((k) => k.startsWith(prefix));
    if (matching.length === 0) return [];
    const pairs = await AsyncStorage.multiGet(matching);
    return pairs
      .map(([, value]) => (value ? (JSON.parse(value) as T) : null))
      .filter((v): v is T => v !== null);
  }

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}
