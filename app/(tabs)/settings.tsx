import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/settingsStore';
import { useProfileStore } from '@/stores/profileStore';
import { useReminder } from '@/hooks/useReminder';
import { Colors, Spacing, Radius, Palette, FontSize, TouchTarget } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { AgeRange, ProfileSensitivity, ThemeMode } from '@/types';

const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: '0-2', label: '0–2 anni' },
  { value: '3-5', label: '3–5 anni' },
  { value: '6-9', label: '6–9 anni' },
  { value: '10-12', label: '10–12 anni' },
  { value: '13+', label: '13+ anni' },
];

const SENSITIVITIES: { value: ProfileSensitivity; label: string; emoji: string }[] = [
  { value: 'aggression', label: 'Aggressività', emoji: '😤' },
  { value: 'anxiety', label: 'Ansia', emoji: '😰' },
  { value: 'sleep', label: 'Sonno', emoji: '😴' },
  { value: 'food', label: 'Cibo', emoji: '🍽' },
  { value: 'school', label: 'Scuola', emoji: '📚' },
  { value: 'transitions', label: 'Transizioni', emoji: '🔄' },
];

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'Sistema' },
  { value: 'light', label: 'Chiaro' },
  { value: 'dark', label: 'Scuro' },
];

// Orari comuni per il reminder (mattina e sera)
const REMINDER_HOURS = [7, 8, 9, 12, 17, 18, 19, 20, 21];

export default function SettingsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const { theme: themeMode, setTheme } = useSettingsStore();
  const { profile, setAgeRange, toggleSensitivity } = useProfileStore();
  const { reminder, enable, disable, updateTime, formatTime } = useReminder();

  const handleReminderToggle = async (value: boolean) => {
    if (value) {
      const granted = await enable();
      if (!granted) {
        Alert.alert(
          'Permesso notifiche',
          'Per attivare il reminder giornaliero devi consentire le notifiche nelle impostazioni del dispositivo.',
          [{ text: 'OK' }]
        );
      }
    } else {
      await disable();
    }
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AppText variant="heading" weight="bold">
          Impostazioni
        </AppText>
        <Spacer size="lg" />

        {/* Età bambino */}
        <AppText variant="label">Età del bambino (opzionale)</AppText>
        <Spacer size="sm" />
        <Card padding="sm">
          <View style={styles.chipRow}>
            {AGE_RANGES.map((range) => {
              const selected = profile.childAgeRange === range.value;
              return (
                <Pressable
                  key={range.value}
                  style={[
                    styles.chip,
                    { borderColor: selected ? Palette.primary : theme.border },
                    selected && { backgroundColor: Palette.primaryLight },
                  ]}
                  onPress={() => setAgeRange(range.value)}
                  accessibilityRole="radio"
                  accessibilityLabel={range.label}
                  accessibilityState={{ selected }}
                >
                  <AppText
                    style={[
                      styles.chipText,
                      { color: selected ? Palette.primary : theme.text },
                    ]}
                    weight={selected ? 'semibold' : 'regular'}
                  >
                    {range.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Spacer size="lg" />

        {/* Aree di sensibilità */}
        <AppText variant="label">Aree di sensibilità</AppText>
        <Spacer size="xs" />
        <AppText secondary variant="caption">
          Aiutano a personalizzare i suggerimenti (opzionale, nessuna diagnosi)
        </AppText>
        <Spacer size="sm" />
        <Card padding="sm">
          {SENSITIVITIES.map((s, i) => {
            const active = profile.sensitivities.includes(s.value);
            return (
              <View key={s.value}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
                <View style={styles.sensitivityRow}>
                  <AppText style={styles.sensitivityEmoji}>{s.emoji}</AppText>
                  <AppText variant="body" style={styles.sensitivityLabel}>
                    {s.label}
                  </AppText>
                  <Switch
                    value={active}
                    onValueChange={() => toggleSensitivity(s.value)}
                    trackColor={{ true: Palette.primary }}
                    accessibilityLabel={s.label}
                  />
                </View>
              </View>
            );
          })}
        </Card>

        <Spacer size="lg" />

        {/* Reminder giornaliero */}
        <AppText variant="label">Reminder giornaliero</AppText>
        <Spacer size="xs" />
        <AppText secondary variant="caption">
          Un promemoria quotidiano per riflettere sulla giornata (opzionale)
        </AppText>
        <Spacer size="sm" />
        <Card padding="sm">
          {/* Toggle abilitazione */}
          <View style={styles.reminderToggleRow}>
            <View style={styles.reminderToggleLeft}>
              <AppText variant="body" weight="semibold">
                🔔 Reminder attivo
              </AppText>
              {reminder.enabled && (
                <AppText secondary variant="caption">
                  Ogni giorno alle {formatTime()}
                </AppText>
              )}
            </View>
            <Switch
              value={reminder.enabled}
              onValueChange={handleReminderToggle}
              trackColor={{ true: Palette.primary }}
              accessibilityLabel="Attiva reminder giornaliero"
            />
          </View>

          {/* Selettore orario — visibile solo se abilitato */}
          {reminder.enabled && (
            <>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <Spacer size="sm" />
              <AppText secondary variant="caption" style={styles.timeLabel}>
                Orario
              </AppText>
              <Spacer size="xs" />
              <View style={styles.chipRow}>
                {REMINDER_HOURS.map((h) => {
                  const selected = reminder.hour === h;
                  return (
                    <Pressable
                      key={h}
                      style={[
                        styles.chip,
                        { borderColor: selected ? Palette.primary : theme.border },
                        selected && { backgroundColor: Palette.primaryLight },
                      ]}
                      onPress={() => updateTime(h, reminder.minute)}
                      accessibilityRole="radio"
                      accessibilityLabel={`${pad(h)}:${pad(reminder.minute)}`}
                      accessibilityState={{ selected }}
                    >
                      <AppText
                        style={[
                          styles.chipText,
                          { color: selected ? Palette.primary : theme.text },
                        ]}
                        weight={selected ? 'semibold' : 'regular'}
                      >
                        {pad(h)}:00
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
              <Spacer size="sm" />
              <AppText secondary variant="caption" style={styles.timeLabel}>
                Minuti
              </AppText>
              <Spacer size="xs" />
              <View style={styles.chipRow}>
                {([0, 30] as const).map((m) => {
                  const selected = reminder.minute === m;
                  return (
                    <Pressable
                      key={m}
                      style={[
                        styles.chip,
                        { borderColor: selected ? Palette.primary : theme.border },
                        selected && { backgroundColor: Palette.primaryLight },
                      ]}
                      onPress={() => updateTime(reminder.hour, m)}
                      accessibilityRole="radio"
                      accessibilityLabel={`:${pad(m)}`}
                      accessibilityState={{ selected }}
                    >
                      <AppText
                        style={[
                          styles.chipText,
                          { color: selected ? Palette.primary : theme.text },
                        ]}
                        weight={selected ? 'semibold' : 'regular'}
                      >
                        :{pad(m)}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}
        </Card>

        <Spacer size="lg" />

        {/* Tema */}
        <AppText variant="label">Tema</AppText>
        <Spacer size="sm" />
        <Card padding="sm">
          <View style={styles.chipRow}>
            {THEME_OPTIONS.map((opt) => {
              const selected = themeMode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={[
                    styles.chip,
                    { borderColor: selected ? Palette.primary : theme.border },
                    selected && { backgroundColor: Palette.primaryLight },
                  ]}
                  onPress={() => setTheme(opt.value)}
                  accessibilityRole="radio"
                  accessibilityLabel={opt.label}
                  accessibilityState={{ selected }}
                >
                  <AppText
                    style={[
                      styles.chipText,
                      { color: selected ? Palette.primary : theme.text },
                    ]}
                    weight={selected ? 'semibold' : 'regular'}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <Spacer size="lg" />

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { borderColor: theme.border }]}>
          <AppText secondary variant="caption" style={styles.disclaimerText}>
            🔒 Tutti i dati rimangono sul tuo dispositivo. Bussola non invia nulla esternamente e non sostituisce il supporto professionale.{'\n\n'}
            In caso di emergenza chiama il 112.
          </AppText>
        </View>

        <Spacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.md },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    padding: Spacing.xs,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    minHeight: TouchTarget.min - 8,
    justifyContent: 'center',
  },
  chipText: { fontSize: FontSize.sm },
  divider: { height: 1, marginHorizontal: -Spacing.sm },
  sensitivityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTarget.min,
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  sensitivityEmoji: { fontSize: 20, width: 28 },
  sensitivityLabel: { flex: 1 },
  reminderToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTarget.min,
    paddingHorizontal: Spacing.xs,
    gap: Spacing.sm,
  },
  reminderToggleLeft: { flex: 1 },
  timeLabel: { paddingHorizontal: Spacing.xs },
  disclaimer: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  disclaimerText: { lineHeight: 20 },
});
