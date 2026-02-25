import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/settingsStore';
import { useProfileStore } from '@/stores/profileStore';
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

export default function SettingsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const { theme: themeMode, setTheme } = useSettingsStore();
  const { profile, setAgeRange, toggleSensitivity } = useProfileStore();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
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
                <TouchableOpacity
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
                </TouchableOpacity>
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

        {/* Tema */}
        <AppText variant="label">Tema</AppText>
        <Spacer size="sm" />
        <Card padding="sm">
          <View style={styles.chipRow}>
            {THEME_OPTIONS.map((opt) => {
              const selected = themeMode === opt.value;
              return (
                <TouchableOpacity
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
                </TouchableOpacity>
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
  disclaimer: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  disclaimerText: { lineHeight: 20 },
});
