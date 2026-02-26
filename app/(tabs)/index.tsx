import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
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
import { Colors, Spacing, Radius, Palette, FontSize, Shadow } from '@/constants/theme';
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

  const inputBorderColor =
    safetyResult.level === 'CRISIS' ? Palette.crisisRed :
    safetyResult.level === 'ALERT'  ? Palette.alertOrange :
    safetyResult.level === 'WATCH'  ? Palette.watchYellow :
    theme.border;

  return (
    <>
      <CrisisOverlay visible={isCrisisMode} onResolve={handleCrisisResolve} />

      <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header branded */}
          <View style={[styles.heroHeader, { backgroundColor: Palette.primaryLight }]}>
            <View style={styles.heroInner}>
              <AppText style={styles.brandMark}>🧭</AppText>
              <View style={styles.heroText}>
                <AppText variant="subheading" weight="bold" style={{ color: Palette.primaryDark }}>
                  Come posso aiutarti?
                </AppText>
                <AppText variant="caption" style={{ color: Palette.primary, marginTop: 2 }}>
                  Descrivi la situazione e ti guido subito
                </AppText>
              </View>
            </View>
          </View>

          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* Input area */}
            <View style={[styles.inputCard, { backgroundColor: theme.surface }, Shadow.sm]}>
              <AppText variant="label" style={{ color: theme.textSecondary, marginBottom: Spacing.sm }}>
                COSA STA SUCCEDENDO?
              </AppText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.background,
                    borderColor: inputBorderColor,
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
                <View style={[styles.safetyBanner, { backgroundColor: Palette.watchYellowLight }]}>
                  <AppText style={[styles.safetyBannerText, { color: '#92400E' }]}>
                    ⚠  Sembra una situazione tesa. Respira prima di agire.
                  </AppText>
                </View>
              )}
              {safetyResult.level === 'ALERT' && (
                <View style={[styles.safetyBanner, { backgroundColor: Palette.alertOrangeLight }]}>
                  <AppText style={[styles.safetyBannerText, { color: '#9A3412' }]}>
                    ⚠  Segnali preoccupanti. Hai bisogno di una pausa adesso?
                  </AppText>
                </View>
              )}
            </View>

            <Spacer size="md" />

            {/* Intensity picker */}
            <View style={[styles.sectionCard, { backgroundColor: theme.surface }, Shadow.sm]}>
              <IntensityPicker value={intensity} onChange={setIntensity} />
            </View>

            <Spacer size="lg" />

            {/* Suggerimenti */}
            {showSuggestions && (
              <>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionAccent, { backgroundColor: Palette.primary }]} />
                  <AppText variant="label" style={{ color: theme.textSecondary }}>
                    STRATEGIE CONSIGLIATE
                  </AppText>
                </View>
                <Spacer size="sm" />
                {suggestions.map((s) => (
                  <SuggestionCard key={s.id} strategy={s} onSelect={handleSelectStrategy} />
                ))}
              </>
            )}

            {/* Feedback dopo selezione */}
            {showFeedback && (
              <View style={[styles.feedbackCard, { backgroundColor: theme.surface }, Shadow.sm]}>
                <View style={[styles.feedbackAccent, { backgroundColor: Palette.safeGreen }]} />
                <View style={styles.feedbackInner}>
                  <AppText variant="caption" style={{ color: Palette.safeGreen }} weight="semibold">
                    STRATEGIA IN USO
                  </AppText>
                  <Spacer size="xs" />
                  <AppText variant="bodyLarge" weight="semibold">
                    {selectedStrategy!.title}
                  </AppText>
                  <FeedbackRow strategyId={selectedStrategy!.id} onFeedback={handleFeedback} />
                  <Spacer size="md" />
                  <Pressable
                    style={({ pressed }) => [
                      styles.resetBtn,
                      { borderColor: Palette.primary, backgroundColor: Palette.primaryLight },
                      pressed && { opacity: 0.75 },
                    ]}
                    onPress={handleReset}
                    accessibilityRole="button"
                    accessibilityLabel="Nuova situazione"
                  >
                    <AppText style={{ color: Palette.primary, fontSize: FontSize.sm }} weight="semibold">
                      + Nuova situazione
                    </AppText>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Empty state */}
            {!situation.trim() && (
              <View style={styles.emptyState}>
                <View style={[styles.emptyIconWrap, { backgroundColor: Palette.primaryLight }]}>
                  <AppText style={styles.emptyIcon}>🧭</AppText>
                </View>
                <Spacer size="md" />
                <AppText variant="bodyLarge" weight="semibold" style={styles.emptyTitle}>
                  Sono qui per guidarti
                </AppText>
                <Spacer size="xs" />
                <AppText secondary variant="body" style={styles.emptyBody}>
                  Scrivi cosa sta succedendo e ti suggerirò subito cosa fare.
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

  heroHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  heroInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
  },
  brandMark: { fontSize: 32 },
  heroText: { flex: 1 },

  scroll: { padding: Spacing.md, paddingTop: Spacing.md },

  inputCard: {
    borderRadius: Radius.xl,
    padding: Spacing.md,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 96,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  safetyBanner: {
    marginTop: Spacing.sm,
    padding: Spacing.sm + 2,
    borderRadius: Radius.md,
  },
  safetyBannerText: {
    fontSize: FontSize.sm,
    lineHeight: 20,
    fontWeight: '500',
  },

  sectionCard: {
    borderRadius: Radius.xl,
    padding: Spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },

  feedbackCard: {
    flexDirection: 'row',
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  feedbackAccent: {
    width: 4,
    flexShrink: 0,
  },
  feedbackInner: {
    flex: 1,
    padding: Spacing.md,
  },

  resetBtn: {
    borderWidth: 1.5,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
  },

  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
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
  emptyTitle: { textAlign: 'center' },
  emptyBody: { textAlign: 'center', maxWidth: 260, lineHeight: 24 },
});
