import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '@/i18n';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEpisodeStore } from '@/stores/episodeStore';
import { useFeedbackStore } from '@/stores/feedbackStore';
import { GestureRoot } from '@/components/GestureRoot';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const loadEpisodes = useEpisodeStore((s) => s.load);
  const loadFeedbacks = useFeedbackStore((s) => s.load);

  useEffect(() => {
    loadEpisodes();
    loadFeedbacks();
  }, [loadEpisodes, loadFeedbacks]);

  return (
    <GestureRoot>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="episode/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureRoot>
  );
}
