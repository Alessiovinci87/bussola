import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { EpisodeCard } from '@/components/episode/EpisodeCard';
import { useEpisodes } from '@/hooks/useEpisodes';
import { PatternAnalyzer } from '@/engines/pattern/PatternAnalyzer';
import { Card } from '@/components/ui/Card';
import { Colors, Spacing, Palette, FontSize, Radius } from '@/constants/theme';
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

  const handleEpisodePress = (episode: Episode) => {
    router.push(`/episode/${episode.id}` as never);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <AppText variant="heading" weight="bold">
          Storico
        </AppText>
        <Spacer size="xs" />
        <AppText secondary variant="body">
          {episodes.length} episodi registrati
        </AppText>

        {/* Pattern insights */}
        {hasInsights && (
          <>
            <Spacer size="lg" />
            <AppText variant="label">Cosa noti:</AppText>
            <Spacer size="sm" />
            {insights.map((insight, i) => (
              <Card key={i} style={styles.insightCard}>
                <AppText style={styles.insightEmoji}>
                  {insight.type === 'time_of_day' ? '🕐' : '📈'}
                </AppText>
                <AppText variant="body">{insight.message}</AppText>
              </Card>
            ))}
          </>
        )}

        {/* Episodi raggruppati per settimana */}
        {isLoaded && episodes.length === 0 && (
          <View style={styles.empty}>
            <AppText style={styles.emptyEmoji}>📋</AppText>
            <AppText secondary variant="body" style={styles.emptyText}>
              Nessun episodio ancora.{'\n'}Usa l'Assistente per registrare il primo.
            </AppText>
          </View>
        )}

        {weekKeys.map((weekLabel) => (
          <View key={weekLabel}>
            <Spacer size="lg" />
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
          </View>
        ))}

        <Spacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.md },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  insightEmoji: { fontSize: 20 },
  empty: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  emptyEmoji: { fontSize: 48 },
  emptyText: { textAlign: 'center' },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  weekLine: { flex: 1, height: 1 },
  weekLabel: { flexShrink: 0 },
});
