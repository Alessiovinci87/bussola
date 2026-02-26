import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import type { Strategy } from '@/content/strategies';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Colors, Palette, Spacing, Radius, FontSize, Shadow } from '@/constants/theme';
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
    <View style={[styles.card, { backgroundColor: theme.surface }, Shadow.sm]}>
      {/* Accent bar sinistra */}
      <View style={[styles.accentBar, { backgroundColor: Palette.primary }]} />

      <View style={styles.inner}>
        {/* Header cliccabile */}
        <Pressable
          onPress={() => setExpanded((v) => !v)}
          style={({ pressed }) => [styles.header, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          accessibilityLabel={strategy.title}
          accessibilityState={{ expanded }}
        >
          <View style={styles.titleRow}>
            <AppText variant="bodyLarge" weight="semibold" style={styles.title}>
              {strategy.title}
            </AppText>
            <View style={[styles.durationPill, { backgroundColor: Palette.primaryLight }]}>
              <AppText style={[styles.durationText, { color: Palette.primaryDark }]}>
                {strategy.durationMinutes} min
              </AppText>
            </View>
          </View>
          <Spacer size="xs" />
          <AppText secondary variant="body" style={styles.description}>
            {strategy.shortDescription}
          </AppText>
          <View style={styles.expandRow}>
            <AppText style={[styles.expandLabel, { color: Palette.primaryMid }]}>
              {expanded ? 'Nascondi passi' : 'Vedi come fare'}
            </AppText>
            <AppText style={[styles.chevron, { color: Palette.primaryMid }]}>
              {expanded ? '▲' : '▼'}
            </AppText>
          </View>
        </Pressable>

        {/* Passi espansi */}
        {expanded && (
          <View style={styles.steps}>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <Spacer size="sm" />
            {strategy.steps.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepNumberCol}>
                  <View style={[styles.stepCircle, { backgroundColor: Palette.primary }]}>
                    <AppText style={styles.stepNum}>{i + 1}</AppText>
                  </View>
                  {i < strategy.steps.length - 1 && (
                    <View style={[styles.stepConnector, { backgroundColor: Palette.primaryLight }]} />
                  )}
                </View>
                <AppText variant="body" style={[styles.stepText, { color: theme.text }]}>
                  {step}
                </AppText>
              </View>
            ))}
            <Spacer size="xs" />
          </View>
        )}

        {/* CTA */}
        <Spacer size="sm" />
        <Pressable
          style={({ pressed }) => [
            styles.selectButton,
            { backgroundColor: Palette.primary },
            pressed && { opacity: 0.85 },
          ]}
          onPress={() => onSelect(strategy)}
          accessibilityRole="button"
          accessibilityLabel={`Usa: ${strategy.title}`}
        >
          <AppText style={styles.selectLabel} weight="semibold">
            Usa questa strategia
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: Radius.xl,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
    flexShrink: 0,
  },
  inner: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {},
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  title: { flex: 1, lineHeight: 24 },
  durationPill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.full,
    flexShrink: 0,
    marginTop: 2,
  },
  durationText: { fontSize: FontSize.xs, fontWeight: '600' },
  description: { lineHeight: 22 },
  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs + 2,
  },
  expandLabel: { fontSize: FontSize.sm, fontWeight: '500' },
  chevron: { fontSize: 10, fontWeight: '600' },
  divider: { height: 1, marginVertical: Spacing.xs },
  steps: {},
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  stepNumberCol: {
    alignItems: 'center',
    marginRight: Spacing.sm,
    width: 28,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNum: { color: '#FFFFFF', fontSize: FontSize.xs, fontWeight: '700' },
  stepConnector: {
    width: 2,
    flex: 1,
    minHeight: Spacing.sm,
    borderRadius: 1,
    marginTop: 3,
    marginBottom: -Spacing.sm + 3,
  },
  stepText: { flex: 1, lineHeight: 22, paddingTop: 3 },
  selectButton: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm + 4,
    alignItems: 'center',
  },
  selectLabel: { color: '#FFFFFF', fontSize: FontSize.md },
});
