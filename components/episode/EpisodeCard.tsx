import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import type { Episode } from '@/types';
import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/AppText';
import { Colors, Palette, Spacing, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { getStrategyById } from '@/content/strategies';

interface EpisodeCardProps {
  episode: Episode;
  onPress: (episode: Episode) => void;
}

const INTENSITY_COLORS = [
  Palette.safeGreen,
  '#65A30D',
  Palette.watchYellow,
  Palette.alertOrange,
  Palette.crisisRed,
];

const INTENSITY_LABELS = ['Molto bassa', 'Bassa', 'Media', 'Alta', 'Molto alta'];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function EpisodeCard({ episode, onPress }: EpisodeCardProps) {
  const scheme = useColorScheme() ?? 'light';
  const strategy = episode.strategyApplied
    ? getStrategyById(episode.strategyApplied)
    : undefined;
  const intensityColor = INTENSITY_COLORS[episode.intensity - 1];

  return (
    <Pressable
      onPress={() => onPress(episode)}
      style={({ pressed }) => pressed && { opacity: 0.8 }}
    >
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={[styles.intensityBadge, { backgroundColor: intensityColor + '22' }]}>
            <View style={[styles.intensityDot, { backgroundColor: intensityColor }]} />
            <AppText
              style={[styles.intensityLabel, { color: intensityColor }]}
              weight="semibold"
            >
              {INTENSITY_LABELS[episode.intensity - 1]}
            </AppText>
          </View>
          {episode.safetyFlagActivated && (
            <View style={styles.safetyBadge}>
              <AppText style={styles.safetyBadgeText}>⚠ Crisi</AppText>
            </View>
          )}
        </View>

        <AppText
          variant="body"
          style={styles.situation}
          numberOfLines={2}
        >
          {episode.situation}
        </AppText>

        <View style={styles.footer}>
          <AppText secondary variant="caption">
            {formatDate(episode.date)}
          </AppText>
          {strategy && (
            <AppText secondary variant="caption" style={styles.strategyLabel}>
              {strategy.title}
            </AppText>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: Spacing.sm },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  intensityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  intensityDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
  intensityLabel: { fontSize: FontSize.xs },
  safetyBadge: {
    backgroundColor: Palette.crisisRedLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  safetyBadgeText: {
    fontSize: FontSize.xs,
    color: Palette.crisisRed,
    fontWeight: '600',
  },
  situation: { marginBottom: Spacing.sm },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  strategyLabel: { fontStyle: 'italic' },
});
