/**
 * Stub web — expo-notifications non è supportato sul browser.
 * Il bundler usa questo file al posto di NotificationService.ts su web.
 */
import type { ScheduledReminder } from './types';

export const NotificationService = {
  async requestPermission(): Promise<boolean> {
    return false;
  },

  async scheduleDaily(_reminder: ScheduledReminder): Promise<string> {
    return '';
  },

  async cancel(_id: string): Promise<void> {},

  async cancelAll(): Promise<void> {},
};
