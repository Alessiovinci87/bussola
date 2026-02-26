import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Palette, Spacing, Radius, TouchTarget, FontSize } from '@/constants/theme';
import type { Episode } from '@/types';

type Intensity = Episode['intensity'];

interface IntensityPickerProps {
  value: Intensity;
  onChange: (v: Intensity) => void;
}

const LEVELS: { value: Intensity; label: string; color: string; emoji: string }[] = [
  { value: 1, label: 'Bassa', color: Palette.safeGreen, emoji: '😌' },
  { value: 2, label: 'Media', color: '#65A30D', emoji: '😐' },
  { value: 3, label: 'Alta', color: Palette.watchYellow, emoji: '😤' },
  { value: 4, label: 'Molto alta', color: Palette.alertOrange, emoji: '😡' },
  { value: 5, label: 'Crisi', color: Palette.crisisRed, emoji: '🤯' },
];

export function IntensityPicker({ value, onChange }: IntensityPickerProps) {
  return (
    <View>
      <AppText variant="label" style={styles.heading}>
        Quanto è intensa la situazione?
      </AppText>
      <View style={styles.row}>
        {LEVELS.map((level) => {
          const selected = value === level.value;
          return (
            <Pressable
              key={level.value}
              style={({ pressed }) => [
                styles.item,
                selected && { backgroundColor: level.color + '22', borderColor: level.color },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => onChange(level.value)}
              accessibilityRole="radio"
              accessibilityLabel={level.label}
              accessibilityState={{ selected }}
            >
              <AppText style={styles.emoji}>{level.emoji}</AppText>
              <AppText
                style={[styles.label, selected && { color: level.color }]}
                weight={selected ? 'semibold' : 'regular'}
              >
                {level.value}
              </AppText>
            </Pressable>
          );
        })}
      </View>
      <AppText secondary variant="caption" style={styles.selectedLabel}>
        {LEVELS.find((l) => l.value === value)?.label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { marginBottom: Spacing.sm },
  row: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  item: {
    flex: 1,
    minHeight: TouchTarget.large,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 4,
    backgroundColor: '#00000008',
  },
  emoji: { fontSize: 22 },
  label: { fontSize: FontSize.md, fontWeight: '600' },
  selectedLabel: { marginTop: Spacing.xs, textAlign: 'center' },
});
