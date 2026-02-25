import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { SuggestionCard } from '@/components/suggestion/SuggestionCard';
import { FeedbackRow } from '@/components/suggestion/FeedbackRow';
import { IntensityPicker } from '@/components/episode/IntensityPicker';
import { CrisisOverlay } from '@/components/safety/CrisisOverlay';
import { useSafety } from '@/hooks/useSafety';
import { useSuggestions } from '@/hooks/useSuggestions';
import { useEpisodes } from '@/hooks/useEpisodes';
import { useFeedbackStore } from '@/stores/feedbackStore';
import { useSafetyStore } from '@/stores/safetyStore';
import { Colors, Spacing, Radius, Palette, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Strategy } from '@/content/strategies';
import type { Episode } from '@/types';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  const [situation, setSituation] = useState('');
  const [intensity, setIntensity] = useState<Episode['intensity']>(3);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [savedEpisodeId, setSavedEpisodeId] = useState<string | null>(null);

  const safetyResult = useSafety(situation);
  const suggestions = useSuggestions(situation, intensity);
  const { add: addEpisode, setOutcome } = useEpisodes();
  const { addFeedback } = useFeedbackStore();
  const { isCrisisMode, resolveCrisis } = useSafetyStore();

  const isCrisis = safetyResult.level === 'CRISIS';

  const handleSelectStrategy = useCallback(
    async (strategy: Strategy) => {
      setSelectedStrategy(strategy);
      const episode = await addEpisode({
        situation,
        intensity,
        safetyFlagActivated: isCrisis,
        strategyApplied: strategy.id,
      });
      setSavedEpisodeId(episode.id);
    },
    [situation, intensity, isCrisis, addEpisode]
  );

  const handleFeedback = useCallback(
    async (strategyId: string, value: 'useful' | 'not_useful') => {
      await addFeedback(strategyId, value);
      if (savedEpisodeId) {
        await setOutcome(savedEpisodeId, value === 'useful' ? 'resolved' : 'partially');
      }
    },
    [addFeedback, savedEpisodeId, setOutcome]
  );

  const handleReset = useCallback(() => {
    setSituation('');
    setIntensity(3);
    setSelectedStrategy(null);
    setSavedEpisodeId(null);
  }, []);

  const handleCrisisResolve = useCallback(async () => {
    resolveCrisis();
    if (!savedEpisodeId) {
      const episode = await addEpisode({
        situation,
        intensity: 5,
        safetyFlagActivated: true,
      });
      setSavedEpisodeId(episode.id);
    }
  }, [resolveCrisis, addEpisode, situation, savedEpisodeId]);

  const showSuggestions = suggestions.length > 0 && !selectedStrategy;
  const showFeedback = !!selectedStrategy;

  return (
    <>
      <CrisisOverlay visible={isCrisisMode} onResolve={handleCrisisResolve} />

      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <AppText variant="heading" weight="bold">
                Cosa sta succedendo?
              </AppText>
              <AppText secondary variant="body" style={styles.headerSub}>
                Descrivi la situazione in poche parole
              </AppText>
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.surface,
                  borderColor:
                    safetyResult.level === 'ALERT'
                      ? Palette.alertOrange
                      : safetyResult.level === 'WATCH'
                      ? Palette.watchYellow
                      : theme.border,
                  color: theme.text,
                },
              ]}
              value={situation}
              onChangeText={setSituation}
              placeholder="Es: sta facendo un capriccio da 20 minuti..."
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              accessibilityLabel="Descrivi la situazione"
            />

            {safetyResult.level === 'WATCH' && (
              <View style={[styles.safetyHint, { backgroundColor: Palette.watchYellow + '22' }]}>
                <AppText style={{ color: Palette.watchYellow, fontSize: FontSize.sm }}>
                  ⚠ Sembra una situazione tesa. Respira prima di agire.
                </AppText>
              </View>
            )}
            {safetyResult.level === 'ALERT' && (
              <View style={[styles.safetyHint, { backgroundColor: Palette.alertOrange + '22' }]}>
                <AppText style={{ color: Palette.alertOrange, fontSize: FontSize.sm }}>
                  ⚠ Segnali preoccupanti. Hai bisogno di una pausa adesso?
                </AppText>
              </View>
            )}

            <Spacer size="md" />
            <IntensityPicker value={intensity} onChange={setIntensity} />
            <Spacer size="lg" />

            {showSuggestions && (
              <>
                <AppText variant="label">Prova adesso:</AppText>
                <Spacer size="sm" />
                {suggestions.map((s) => (
                  <SuggestionCard key={s.id} strategy={s} onSelect={handleSelectStrategy} />
                ))}
              </>
            )}

            {showFeedback && (
              <View
                style={[
                  styles.feedbackBox,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <AppText variant="bodyLarge" weight="semibold">
                  Hai usato: {selectedStrategy!.title}
                </AppText>
                <FeedbackRow strategyId={selectedStrategy!.id} onFeedback={handleFeedback} />
                <Spacer size="md" />
                <AppText style={styles.resetLink} onPress={handleReset}>
                  Nuova situazione →
                </AppText>
              </View>
            )}

            {!situation.trim() && (
              <View style={styles.placeholder}>
                <AppText style={styles.placeholderEmoji}>🧭</AppText>
                <AppText secondary variant="body" style={styles.placeholderText}>
                  Scrivi cosa sta succedendo e ti suggerirò cosa fare adesso.
                </AppText>
              </View>
            )}

            <Spacer size="xxl" />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { padding: Spacing.md },
  header: { marginBottom: Spacing.md },
  headerSub: { marginTop: Spacing.xs },
  input: {
    borderWidth: 1.5,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 100,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  safetyHint: {
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.md,
  },
  feedbackBox: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  resetLink: {
    color: Palette.primary,
    fontSize: FontSize.md,
    fontWeight: '600',
    textAlign: 'center',
  },
  placeholder: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  placeholderEmoji: { fontSize: 48 },
  placeholderText: { textAlign: 'center', maxWidth: 280 },
});
