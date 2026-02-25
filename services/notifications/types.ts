export interface ScheduledReminder {
  id: string;
  hour: number;
  minute: number;
  enabled: boolean;
  message: string;
}
