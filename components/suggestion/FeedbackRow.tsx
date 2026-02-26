import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Colors, Spacing, Radius, Palette, TouchTarget } from '@/constants/theme';
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
      <View style={styles.row}>
        <AppText secondary variant="caption">
          {selected === 'useful' ? 'Grazie per il feedback!' : 'Capito, ci aiuterai a migliorare.'}
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <AppText secondary variant="caption" style={styles.label}>
        È stata utile?
      </AppText>
      <Pressable
        style={({ pressed }) => [styles.btn, { borderColor: theme.border }, pressed && { opacity: 0.7 }]}
        onPress={() => handleSelect('useful')}
        accessibilityRole="button"
        accessibilityLabel="Sì, utile"
      >
        <AppText style={styles.emoji}>👍</AppText>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.btn, { borderColor: theme.border }, pressed && { opacity: 0.7 }]}
        onPress={() => handleSelect('not_useful')}
        accessibilityRole="button"
        accessibilityLabel="No, non utile"
      >
        <AppText style={styles.emoji}>👎</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  label: { flex: 1 },
  btn: {
    width: TouchTarget.min,
    height: TouchTarget.min,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 20 },
});
