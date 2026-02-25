import { useCallback } from 'react';
import { Platform } from 'react-native';
import { NotificationService } from '@/services/notifications/NotificationService';
import { useSettingsStore } from '@/stores/settingsStore';
import type { ReminderSettings } from '@/types';

const REMINDER_ID = 'daily-reminder';

const pad = (n: number) => String(n).padStart(2, '0');

export function useReminder() {
  const { reminder, setReminder } = useSettingsStore();

  const enable = useCallback(async (): Promise<boolean> => {
    // Permission non richiesta sul web
    if (Platform.OS === 'web') return false;

    const granted = await NotificationService.requestPermission();
    if (!granted) return false;

    const updated: ReminderSettings = { ...reminder, enabled: true };
    await NotificationService.cancel(REMINDER_ID);
    await NotificationService.scheduleDaily({
      id: REMINDER_ID,
      hour: updated.hour,
      minute: updated.minute,
      enabled: true,
      message: 'Come sta andando oggi? Bussola è qui per aiutarti.',
    });
    setReminder(updated);
    return true;
  }, [reminder, setReminder]);

  const disable = useCallback(async () => {
    await NotificationService.cancel(REMINDER_ID);
    setReminder({ ...reminder, enabled: false });
  }, [reminder, setReminder]);

  const updateTime = useCallback(
    async (hour: number, minute: 0 | 30) => {
      const updated: ReminderSettings = { ...reminder, hour, minute };
      setReminder(updated);

      // Se è abilitato, riprogramma subito con il nuovo orario
      if (reminder.enabled && Platform.OS !== 'web') {
        await NotificationService.cancel(REMINDER_ID);
        await NotificationService.scheduleDaily({
          id: REMINDER_ID,
          hour,
          minute,
          enabled: true,
          message: 'Come sta andando oggi? Bussola è qui per aiutarti.',
        });
      }
    },
    [reminder, setReminder]
  );

  const formatTime = () =>
    `${pad(reminder.hour)}:${pad(reminder.minute)}`;

  return { reminder, enable, disable, updateTime, formatTime };
}
