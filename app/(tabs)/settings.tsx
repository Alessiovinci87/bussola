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
import { useSettingsStore } from '@/stores/settingsStore';
import { useProfileStore } from '@/stores/profileStore';
import { useReminder } from '@/hooks/useReminder';
import { Colors, Spacing, Radius, Palette, FontSize, TouchTarget, Shadow } from '@/constants/theme';
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

const THEME_OPTIONS: { value: ThemeMode; label: string; emoji: string }[] = [
  { value: 'system', label: 'Sistema', emoji: '⚙️' },
  { value: 'light', label: 'Chiaro', emoji: '☀️' },
  { value: 'dark', label: 'Scuro', emoji: '🌙' },
];

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
      {/* Header branded */}
      <View style={[styles.heroHeader, { backgroundColor: Palette.primaryLight }]}>
        <AppText variant="subheading" weight="bold" style={{ color: Palette.primaryDark }}>
          Impostazioni
        </AppText>
        <AppText variant="caption" style={{ color: Palette.primary, marginTop: 2 }}>
          Personalizza la tua esperienza
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Età bambino */}
        <AppText variant="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          ETÀ DEL BAMBINO
        </AppText>
        <AppText secondary variant="caption" style={styles.sectionHint}>
          Opzionale — migliora la pertinenza dei suggerimenti
        </AppText>
        <Spacer size="sm" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }, Shadow.sm]}>
          <View style={styles.chipRow}>
            {AGE_RANGES.map((range) => {
              const selected = profile.childAgeRange === range.value;
              return (
                <Pressable
                  key={range.value}
                  style={({ pressed }) => [
                    styles.chip,
                    { borderColor: selected ? Palette.primary : theme.border },
                    selected && { backgroundColor: Palette.primaryLight },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => setAgeRange(range.value)}
                  accessibilityRole="radio"
                  accessibilityLabel={range.label}
                  accessibilityState={{ selected }}
                >
                  <AppText
                    style={[styles.chipText, { color: selected ? Palette.primary : theme.text }]}
                    weight={selected ? 'semibold' : 'regular'}
                  >
                    {range.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Spacer size="xl" />

        {/* Aree di sensibilità */}
        <AppText variant="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          AREE DI SENSIBILITÀ
        </AppText>
        <AppText secondary variant="caption" style={styles.sectionHint}>
          Personalizzano i suggerimenti — nessuna diagnosi
        </AppText>
        <Spacer size="sm" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }, Shadow.sm]}>
          {SENSITIVITIES.map((s, i) => {
            const active = profile.sensitivities.includes(s.value);
            return (
              <View key={s.value}>
                {i > 0 && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
                <View style={styles.rowItem}>
                  <View style={[styles.emojiWrap, { backgroundColor: active ? Palette.primaryLight : theme.background }]}>
                    <AppText style={styles.rowEmoji}>{s.emoji}</AppText>
                  </View>
                  <AppText variant="body" style={styles.rowLabel}>
                    {s.label}
                  </AppText>
                  <Switch
                    value={active}
                    onValueChange={() => toggleSensitivity(s.value)}
                    trackColor={{ false: theme.border, true: Palette.primary }}
                    thumbColor="#FFFFFF"
                    accessibilityLabel={s.label}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <Spacer size="xl" />

        {/* Reminder giornaliero */}
        <AppText variant="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          REMINDER GIORNALIERO
        </AppText>
        <AppText secondary variant="caption" style={styles.sectionHint}>
          Un promemoria quotidiano per riflettere sulla giornata
        </AppText>
        <Spacer size="sm" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }, Shadow.sm]}>
          <View style={styles.rowItem}>
            <View style={[styles.emojiWrap, { backgroundColor: reminder.enabled ? Palette.primaryLight : theme.background }]}>
              <AppText style={styles.rowEmoji}>🔔</AppText>
            </View>
            <View style={styles.reminderToggleText}>
              <AppText variant="body" weight="semibold">Reminder attivo</AppText>
              {reminder.enabled && (
                <AppText secondary variant="caption">
                  Ogni giorno alle {formatTime()}
                </AppText>
              )}
            </View>
            <Switch
              value={reminder.enabled}
              onValueChange={handleReminderToggle}
              trackColor={{ false: theme.border, true: Palette.primary }}
              thumbColor="#FFFFFF"
              accessibilityLabel="Attiva reminder giornaliero"
            />
          </View>

          {reminder.enabled && (
            <>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <Spacer size="sm" />
              <AppText secondary variant="caption" style={styles.timeGroupLabel}>Ora</AppText>
              <Spacer size="xs" />
              <View style={styles.chipRow}>
                {REMINDER_HOURS.map((h) => {
                  const selected = reminder.hour === h;
                  return (
                    <Pressable
                      key={h}
                      style={({ pressed }) => [
                        styles.chip,
                        { borderColor: selected ? Palette.primary : theme.border },
                        selected && { backgroundColor: Palette.primaryLight },
                        pressed && { opacity: 0.75 },
                      ]}
                      onPress={() => updateTime(h, reminder.minute)}
                      accessibilityRole="radio"
                      accessibilityLabel={`${pad(h)}:${pad(reminder.minute)}`}
                      accessibilityState={{ selected }}
                    >
                      <AppText
                        style={[styles.chipText, { color: selected ? Palette.primary : theme.text }]}
                        weight={selected ? 'semibold' : 'regular'}
                      >
                        {pad(h)}:00
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
              <Spacer size="sm" />
              <AppText secondary variant="caption" style={styles.timeGroupLabel}>Minuti</AppText>
              <Spacer size="xs" />
              <View style={styles.chipRow}>
                {([0, 30] as const).map((m) => {
                  const selected = reminder.minute === m;
                  return (
                    <Pressable
                      key={m}
                      style={({ pressed }) => [
                        styles.chip,
                        { borderColor: selected ? Palette.primary : theme.border },
                        selected && { backgroundColor: Palette.primaryLight },
                        pressed && { opacity: 0.75 },
                      ]}
                      onPress={() => updateTime(reminder.hour, m)}
                      accessibilityRole="radio"
                      accessibilityLabel={`:${pad(m)}`}
                      accessibilityState={{ selected }}
                    >
                      <AppText
                        style={[styles.chipText, { color: selected ? Palette.primary : theme.text }]}
                        weight={selected ? 'semibold' : 'regular'}
                      >
                        :{pad(m)}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>
              <Spacer size="xs" />
            </>
          )}
        </View>

        <Spacer size="xl" />

        {/* Tema */}
        <AppText variant="label" style={[styles.sectionTitle, { color: theme.textSecondary }]}>
          TEMA
        </AppText>
        <Spacer size="sm" />
        <View style={[styles.sectionCard, { backgroundColor: theme.surface }, Shadow.sm]}>
          <View style={styles.chipRow}>
            {THEME_OPTIONS.map((opt) => {
              const selected = themeMode === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={({ pressed }) => [
                    styles.chip,
                    { borderColor: selected ? Palette.primary : theme.border },
                    selected && { backgroundColor: Palette.primaryLight },
                    pressed && { opacity: 0.75 },
                  ]}
                  onPress={() => setTheme(opt.value)}
                  accessibilityRole="radio"
                  accessibilityLabel={opt.label}
                  accessibilityState={{ selected }}
                >
                  <AppText style={styles.chipEmoji}>{opt.emoji}</AppText>
                  <AppText
                    style={[styles.chipText, { color: selected ? Palette.primary : theme.text }]}
                    weight={selected ? 'semibold' : 'regular'}
                  >
                    {opt.label}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Spacer size="xl" />

        {/* Disclaimer */}
        <View style={[styles.disclaimer, { backgroundColor: Palette.primaryLight, borderColor: Palette.primaryMid + '40' }]}>
          <AppText style={styles.disclaimerIcon}>🔒</AppText>
          <AppText variant="caption" style={[styles.disclaimerText, { color: Palette.primaryDark }]}>
            Tutti i dati rimangono sul tuo dispositivo. Bussola non invia nulla esternamente e non sostituisce il supporto professionale.{'\n\n'}
            In caso di emergenza chiama il{' '}
            <AppText style={[styles.disclaimerText, { color: Palette.primaryDark, fontWeight: '700' }]}>
              112
            </AppText>.
          </AppText>
        </View>

        <Spacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  heroHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md + 2,
  },
  scroll: { padding: Spacing.md, paddingTop: Spacing.md },

  sectionTitle: {
    letterSpacing: 0.5,
  },
  sectionHint: {
    marginTop: 2,
    marginBottom: Spacing.xs,
  },
  sectionCard: {
    borderRadius: Radius.xl,
    padding: Spacing.md,
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    minHeight: 36,
    justifyContent: 'center',
  },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: FontSize.sm },

  divider: { height: 1, marginHorizontal: -Spacing.md },

  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: TouchTarget.min,
    gap: Spacing.sm,
  },
  emojiWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowEmoji: { fontSize: 18 },
  rowLabel: { flex: 1 },
  reminderToggleText: { flex: 1 },
  timeGroupLabel: { paddingHorizontal: 0 },

  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.md,
  },
  disclaimerIcon: { fontSize: 18, marginTop: 1 },
  disclaimerText: { flex: 1, lineHeight: 20 },
});
