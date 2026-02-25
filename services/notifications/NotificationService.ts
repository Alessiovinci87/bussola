import * as Notifications from 'expo-notifications';
import type { NotificationBehavior } from 'expo-notifications';
import { Platform } from 'react-native';
import type { ScheduledReminder } from './types';

// setNotificationHandler non è supportato su web
if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async (): Promise<NotificationBehavior> => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
      priority: Notifications.AndroidNotificationPriority.DEFAULT,
    }),
  });
}

export const NotificationService = {
  async requestPermission(): Promise<boolean> {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  async scheduleDaily(reminder: ScheduledReminder): Promise<string> {
    return Notifications.scheduleNotificationAsync({
      identifier: reminder.id,
      content: {
        title: 'Bussola',
        body: reminder.message,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: reminder.hour,
        minute: reminder.minute,
      },
    });
  },

  async cancel(id: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(id);
  },

  async cancelAll(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
};
