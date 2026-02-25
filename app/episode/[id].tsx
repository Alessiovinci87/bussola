import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Card } from '@/components/ui/Card';
import { useEpisodes } from '@/hooks/useEpisodes';
import { getStrategyById } from '@/content/strategies';
import { Colors, Spacing, Palette, Radius, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const INTENSITY_LABELS = ['Molto bassa', 'Bassa', 'Media', 'Alta', 'Molto alta'];
const INTENSITY_COLORS = [
  Palette.safeGreen,
  '#65A30D',
  Palette.watchYellow,
  Palette.alertOrange,
  Palette.crisisRed,
];
const OUTCOME_LABELS: Record<string, string> = {
  resolved: '✅ Risolto',
  partially: '⚠ Parzialmente risolto',
  unresolved: '❌ Non risolto',
};

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function EpisodeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const { episodes, remove } = useEpisodes();

  const episode = episodes.find((e) => e.id === id);

  if (!episode) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <View style={styles.center}>
          <AppText secondary>Episodio non trovato.</AppText>
        </View>
      </SafeAreaView>
    );
  }

  const strategy = episode.strategyApplied
    ? getStrategyById(episode.strategyApplied)
    : undefined;
  const intensityColor = INTENSITY_COLORS[episode.intensity - 1];

  const handleDelete = () => {
    Alert.alert(
      'Elimina episodio',
      'Sei sicuro di voler eliminare questo episodio?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Elimina',
          style: 'destructive',
          onPress: async () => {
            await remove(episode.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Indietro">
            <AppText style={{ color: Palette.primary, fontSize: FontSize.md }}>← Indietro</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} accessibilityRole="button" accessibilityLabel="Elimina episodio">
            <AppText style={{ color: Palette.crisisRed, fontSize: FontSize.sm }}>Elimina</AppText>
          </TouchableOpacity>
        </View>

        <Spacer size="md" />

        <AppText secondary variant="caption">
          {formatDateTime(episode.date)}
        </AppText>
        <Spacer size="sm" />

        {episode.safetyFlagActivated && (
          <>
            <View style={[styles.safetyBadge, { backgroundColor: Palette.crisisRedLight }]}>
              <AppText style={{ color: Palette.crisisRed, fontSize: FontSize.sm, fontWeight: '600' }}>
                ⚠ Crisi attivata durante questo episodio
              </AppText>
            </View>
            <Spacer size="sm" />
          </>
        )}

        {/* Intensità */}
        <View style={[styles.intensityRow, { backgroundColor: intensityColor + '18' }]}>
          <View style={[styles.intensityDot, { backgroundColor: intensityColor }]} />
          <AppText style={{ color: intensityColor, fontWeight: '600' }}>
            Intensità {episode.intensity}/5 — {INTENSITY_LABELS[episode.intensity - 1]}
          </AppText>
        </View>

        <Spacer size="md" />

        <Card>
          <AppText variant="label">Situazione</AppText>
          <Spacer size="xs" />
          <AppText variant="body">{episode.situation}</AppText>
        </Card>

        {strategy && (
          <>
            <Spacer size="sm" />
            <Card>
              <AppText variant="label">Strategia applicata</AppText>
              <Spacer size="xs" />
              <AppText variant="bodyLarge" weight="semibold">{strategy.title}</AppText>
              <AppText secondary variant="body">{strategy.shortDescription}</AppText>
            </Card>
          </>
        )}

        {episode.outcome && (
          <>
            <Spacer size="sm" />
            <Card>
              <AppText variant="label">Esito</AppText>
              <Spacer size="xs" />
              <AppText variant="body">{OUTCOME_LABELS[episode.outcome] ?? episode.outcome}</AppText>
            </Card>
          </>
        )}

        {episode.durationMinutes && (
          <>
            <Spacer size="sm" />
            <Card>
              <AppText variant="label">Durata</AppText>
              <Spacer size="xs" />
              <AppText variant="body">{episode.durationMinutes} minuti</AppText>
            </Card>
          </>
        )}

        <Spacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.md },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  safetyBadge: {
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  intensityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  intensityDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
  },
});
