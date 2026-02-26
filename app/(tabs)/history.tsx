import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { EpisodeCard } from '@/components/episode/EpisodeCard';
import { useEpisodes } from '@/hooks/useEpisodes';
import { PatternAnalyzer } from '@/engines/pattern/PatternAnalyzer';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Palette, FontSize, Radius, Shadow } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Episode } from '@/types';

function groupByWeek(episodes: Episode[]): Record<string, Episode[]> {
  const groups: Record<string, Episode[]> = {};
  for (const ep of episodes) {
    const d = new Date(ep.date);
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const key = weekStart.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(ep);
  }
  return groups;
}

export default function HistoryScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const router = useRouter();
  const { episodes, isLoaded } = useEpisodes();

  const grouped = groupByWeek(episodes);
  const weekKeys = Object.keys(grouped);
  const insights = PatternAnalyzer.analyze(episodes);
  const hasInsights = insights.length > 0;

  const avgIntensity = episodes.length > 0
    ? (episodes.reduce((s, e) => s + e.intensity, 0) / episodes.length).toFixed(1)
    : null;

  const handleEpisodePress = (episode: Episode) => {
    router.push(`/episode/${episode.id}` as never);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      {/* Header branded */}
      <View style={[styles.heroHeader, { backgroundColor: Palette.primaryLight }]}>
        <AppText variant="subheading" weight="bold" style={{ color: Palette.primaryDark }}>
          Storico
        </AppText>
        <AppText variant="caption" style={{ color: Palette.primary, marginTop: 2 }}>
          {episodes.length === 0
            ? 'Nessun episodio ancora'
            : `${episodes.length} episod${episodes.length === 1 ? 'io' : 'i'} registrat${episodes.length === 1 ? 'o' : 'i'}`}
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Stats summary */}
        {episodes.length > 0 && (
          <>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: theme.surface }, Shadow.sm]}>
                <AppText style={[styles.statNumber, { color: Palette.primary }]}>
                  {episodes.length}
                </AppText>
                <AppText variant="caption" secondary style={styles.statLabel}>
                  Episodi
                </AppText>
              </View>
              {avgIntensity && (
                <View style={[styles.statCard, { backgroundColor: theme.surface }, Shadow.sm]}>
                  <AppText style={[styles.statNumber, { color: Palette.watchYellow }]}>
                    {avgIntensity}
                  </AppText>
                  <AppText variant="caption" secondary style={styles.statLabel}>
                    Intensità media
                  </AppText>
                </View>
              )}
              <View style={[styles.statCard, { backgroundColor: theme.surface }, Shadow.sm]}>
                <AppText style={[styles.statNumber, { color: Palette.safeGreen }]}>
                  {episodes.filter((e) => e.outcome === 'resolved').length}
                </AppText>
                <AppText variant="caption" secondary style={styles.statLabel}>
                  Risolti
                </AppText>
              </View>
            </View>
            <Spacer size="lg" />
          </>
        )}

        {/* Pattern insights */}
        {hasInsights && (
          <>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionAccent, { backgroundColor: Palette.primaryMid }]} />
              <AppText variant="label" style={{ color: theme.textSecondary }}>
                COSA NOTI
              </AppText>
            </View>
            <Spacer size="sm" />
            {insights.map((insight, i) => (
              <View
                key={i}
                style={[styles.insightCard, { backgroundColor: Palette.primaryLight }, Shadow.sm]}
              >
                <AppText style={styles.insightEmoji}>
                  {insight.type === 'time_of_day' ? '🕐' : '📈'}
                </AppText>
                <AppText variant="body" style={{ color: Palette.primaryDark, flex: 1 }}>
                  {insight.message}
                </AppText>
              </View>
            ))}
            <Spacer size="lg" />
          </>
        )}

        {/* Empty state */}
        {isLoaded && episodes.length === 0 && (
          <View style={styles.empty}>
            <View style={[styles.emptyIconWrap, { backgroundColor: Palette.primaryLight }]}>
              <AppText style={styles.emptyIcon}>📋</AppText>
            </View>
            <Spacer size="md" />
            <AppText variant="bodyLarge" weight="semibold" style={{ textAlign: 'center' }}>
              Nessun episodio ancora
            </AppText>
            <Spacer size="xs" />
            <AppText secondary variant="body" style={styles.emptyText}>
              Usa l'Assistente per registrare il primo.
            </AppText>
          </View>
        )}

        {/* Episodi raggruppati per settimana */}
        {weekKeys.map((weekLabel) => (
          <View key={weekLabel}>
            <View style={styles.weekHeader}>
              <View style={[styles.weekLine, { backgroundColor: theme.border }]} />
              <AppText secondary variant="caption" style={styles.weekLabel}>
                Settimana del {weekLabel}
              </AppText>
              <View style={[styles.weekLine, { backgroundColor: theme.border }]} />
            </View>
            <Spacer size="sm" />
            {grouped[weekLabel].map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onPress={handleEpisodePress} />
            ))}
            <Spacer size="sm" />
          </View>
        ))}

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

  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    lineHeight: 36,
  },
  statLabel: {
    marginTop: 2,
    textAlign: 'center',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },

  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  insightEmoji: { fontSize: 22 },

  empty: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: { fontSize: 36 },
  emptyText: { textAlign: 'center', maxWidth: 240 },

  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  weekLine: { flex: 1, height: 1 },
  weekLabel: { flexShrink: 0 },
});
