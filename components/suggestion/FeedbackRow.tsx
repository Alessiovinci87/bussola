import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Colors, Spacing, Radius, Palette, FontSize, TouchTarget } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { FeedbackValue } from '@/types';

interface FeedbackRowProps {
  strategyId: string;
  onFeedback: (strategyId: string, value: FeedbackValue) => void;
}

export function FeedbackRow({ strategyId, onFeedback }: FeedbackRowProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [selected, setSelected] = useState<FeedbackValue | null>(null);

  const handleSelect = (value: FeedbackValue) => {
    if (selected) return;
    setSelected(value);
    onFeedback(strategyId, value);
  };

  if (selected) {
    return (
      <View style={styles.confirmedRow}>
        <View style={[styles.confirmedBadge, { backgroundColor: Palette.safeGreenLight }]}>
          <AppText style={[styles.confirmedText, { color: Palette.safeGreen }]} weight="semibold">
            {selected === 'useful'
              ? '✓  Grazie per il feedback!'
              : '✓  Capito, ci aiuterai a migliorare.'}
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppText secondary variant="caption" style={styles.label}>
        È stata utile?
      </AppText>
      <View style={styles.btnRow}>
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            styles.btnYes,
            { borderColor: Palette.safeGreen, backgroundColor: Palette.safeGreenLight },
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => handleSelect('useful')}
          accessibilityRole="button"
          accessibilityLabel="Sì, mi ha aiutato"
        >
          <AppText style={[styles.btnText, { color: Palette.safeGreen }]} weight="semibold">
            👍  Sì, mi ha aiutato
          </AppText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.btn,
            { borderColor: theme.border, backgroundColor: theme.surface },
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => handleSelect('not_useful')}
          accessibilityRole="button"
          accessibilityLabel="Non proprio"
        >
          <AppText style={[styles.btnText, { color: theme.textSecondary }]} weight="medium">
            👎  Non proprio
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.sm,
  },
  label: {
    marginBottom: Spacing.sm,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  btn: {
    flex: 1,
    minHeight: TouchTarget.min,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  btnYes: {},
  btnText: {
    fontSize: FontSize.sm,
  },
  confirmedRow: {
    marginTop: Spacing.sm,
  },
  confirmedBadge: {
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  confirmedText: {
    fontSize: FontSize.sm,
  },
});
