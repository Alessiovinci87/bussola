import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Colors, Palette, Spacing, Radius, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Episode } from '@/types';

type Intensity = Episode['intensity'];

const LEVELS: { value: Intensity; label: string; color: string; desc: string }[] = [
  { value: 1, label: '1', color: Palette.safeGreen,   desc: 'Tesa ma gestibile' },
  { value: 2, label: '2', color: '#65A30D',            desc: 'Un po\' agitata' },
  { value: 3, label: '3', color: Palette.watchYellow,  desc: 'Abbastanza intensa' },
  { value: 4, label: '4', color: Palette.alertOrange,  desc: 'Molto intensa' },
  { value: 5, label: '5', color: Palette.crisisRed,    desc: 'Al limite' },
];

interface IntensityPickerProps {
  value: Intensity;
  onChange: (v: Intensity) => void;
}

export function IntensityPicker({ value, onChange }: IntensityPickerProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const selected = LEVELS.find((l) => l.value === value)!;

  return (
    <View>
      <View style={styles.header}>
        <AppText variant="label" style={{ color: theme.textSecondary }}>
          Intensità della situazione
        </AppText>
        <View style={[styles.descBadge, { backgroundColor: selected.color + '1A' }]}>
          <AppText style={[styles.descText, { color: selected.color }]} weight="semibold">
            {selected.desc}
          </AppText>
        </View>
      </View>

      <View style={styles.bar}>
        {LEVELS.map((level, i) => {
          const isSelected = value === level.value;
          const isFirst = i === 0;
          const isLast = i === LEVELS.length - 1;
          const inactiveColor = scheme === 'dark' ? Palette.darkSurface2 : theme.border;

          return (
            <Pressable
              key={level.value}
              style={({ pressed }) => [
                styles.segment,
                {
                  backgroundColor: isSelected ? level.color : inactiveColor,
                  borderTopLeftRadius: isFirst ? Radius.md : 0,
                  borderBottomLeftRadius: isFirst ? Radius.md : 0,
                  borderTopRightRadius: isLast ? Radius.md : 0,
                  borderBottomRightRadius: isLast ? Radius.md : 0,
                  opacity: pressed ? 0.75 : 1,
                },
              ]}
              onPress={() => onChange(level.value)}
              accessibilityRole="radio"
              accessibilityLabel={`Intensità ${level.value}: ${level.desc}`}
              accessibilityState={{ selected: isSelected }}
            >
              <AppText
                style={[
                  styles.segmentLabel,
                  {
                    color: isSelected
                      ? '#FFFFFF'
                      : scheme === 'dark' ? theme.textSecondary : Palette.gray400,
                  },
                ]}
                weight={isSelected ? 'bold' : 'medium'}
              >
                {level.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  descBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: Radius.full,
  },
  descText: {
    fontSize: FontSize.xs,
  },
  bar: {
    flexDirection: 'row',
    height: 52,
    gap: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLabel: {
    fontSize: FontSize.md,
  },
});
