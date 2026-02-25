import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import type { Strategy } from '@/content/strategies';
import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Colors, Palette, Spacing, Radius, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface SuggestionCardProps {
  strategy: Strategy;
  onSelect: (strategy: Strategy) => void;
}

export function SuggestionCard({ strategy, onSelect }: SuggestionCardProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [expanded, setExpanded] = useState(false);

  return (
    <Card style={styles.card}>
      <TouchableOpacity
        onPress={() => setExpanded((v) => !v)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={strategy.title}
      >
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <AppText variant="bodyLarge" weight="semibold" style={styles.title}>
              {strategy.title}
            </AppText>
            <AppText secondary style={styles.duration}>
              {strategy.durationMinutes} min
            </AppText>
          </View>
          <Spacer size="xs" />
          <AppText secondary variant="body">
            {strategy.shortDescription}
          </AppText>
        </View>

        {expanded && (
          <View style={styles.steps}>
            <Spacer size="sm" />
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Spacer size="sm" />
            {strategy.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={[styles.stepNumber, { backgroundColor: Palette.primaryLight }]}>
                  <AppText
                    style={{ color: Palette.primary, fontSize: FontSize.xs }}
                    weight="bold"
                  >
                    {i + 1}
                  </AppText>
                </View>
                <AppText variant="body" style={styles.stepText}>
                  {step}
                </AppText>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>

      <Spacer size="sm" />
      <TouchableOpacity
        style={[styles.selectButton, { backgroundColor: Palette.primary }]}
        onPress={() => onSelect(strategy)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Usa: ${strategy.title}`}
      >
        <AppText style={styles.selectLabel} weight="semibold">
          Usa questa strategia
        </AppText>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm },
  header: {},
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { flex: 1, marginRight: Spacing.sm },
  duration: { fontSize: FontSize.sm },
  divider: { height: 1 },
  steps: {},
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
    flexShrink: 0,
  },
  stepText: { flex: 1 },
  selectButton: {
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm + 4,
    alignItems: 'center',
  },
  selectLabel: { color: '#FFFFFF', fontSize: FontSize.md },
});
