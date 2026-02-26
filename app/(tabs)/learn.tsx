import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Card } from '@/components/ui/Card';
import { COMMON_ERRORS } from '@/content/commonErrors';
import { Colors, Spacing, Radius, Palette, FontSize } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LearnScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <AppText variant="heading" weight="bold">
          Errori comuni
        </AppText>
        <Spacer size="xs" />
        <AppText secondary variant="body">
          {COMMON_ERRORS.length} scenari. Tocca per approfondire.
        </AppText>
        <Spacer size="lg" />

        {COMMON_ERRORS.map((error) => {
          const isOpen = expandedId === error.id;
          return (
            <Card key={error.id} style={styles.card}>
              <Pressable
                onPress={() => setExpandedId(isOpen ? null : error.id)}
                style={({ pressed }) => pressed && { opacity: 0.8 }}
                accessibilityRole="button"
                accessibilityLabel={error.title}
                accessibilityState={{ expanded: isOpen }}
              >
                <View style={styles.cardHeader}>
                  <AppText variant="bodyLarge" weight="semibold" style={styles.cardTitle}>
                    {error.title}
                  </AppText>
                  <AppText secondary style={styles.chevron}>
                    {isOpen ? '▲' : '▼'}
                  </AppText>
                </View>

                {!isOpen && (
                  <AppText secondary variant="caption" numberOfLines={1} style={styles.mythPreview}>
                    "{error.myth}"
                  </AppText>
                )}
              </Pressable>

              {isOpen && (
                <View style={styles.detail}>
                  <Spacer size="sm" />
                  <View style={[styles.divider, { backgroundColor: theme.border }]} />
                  <Spacer size="sm" />

                  <View style={styles.section}>
                    <View style={[styles.badge, { backgroundColor: Palette.alertOrange + '22' }]}>
                      <AppText style={[styles.badgeText, { color: Palette.alertOrange }]}>
                        Il mito
                      </AppText>
                    </View>
                    <Spacer size="xs" />
                    <AppText variant="body" style={styles.mythText}>
                      "{error.myth}"
                    </AppText>
                  </View>

                  <Spacer size="md" />

                  <View style={styles.section}>
                    <View style={[styles.badge, { backgroundColor: Palette.safeGreen + '22' }]}>
                      <AppText style={[styles.badgeText, { color: Palette.safeGreen }]}>
                        La realtà
                      </AppText>
                    </View>
                    <Spacer size="xs" />
                    <AppText variant="body">{error.reality}</AppText>
                  </View>

                  <Spacer size="md" />

                  <View style={[styles.whatToDoBox, { backgroundColor: Palette.primaryLight }]}>
                    <AppText style={[styles.whatToDoLabel, { color: Palette.primary }]} weight="semibold">
                      Cosa fare invece:
                    </AppText>
                    <Spacer size="xs" />
                    <AppText variant="body" style={{ color: Palette.primaryDark }}>
                      {error.whatToDo}
                    </AppText>
                  </View>
                </View>
              )}
            </Card>
          );
        })}

        <Spacer size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: Spacing.md },
  card: { marginBottom: Spacing.sm },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  cardTitle: { flex: 1 },
  chevron: { fontSize: FontSize.xs, marginTop: 4 },
  mythPreview: { marginTop: Spacing.xs, fontStyle: 'italic' },
  detail: {},
  divider: { height: 1 },
  section: {},
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  badgeText: { fontSize: FontSize.xs, fontWeight: '600' },
  mythText: { fontStyle: 'italic' },
  whatToDoBox: {
    padding: Spacing.md,
    borderRadius: Radius.md,
  },
  whatToDoLabel: { fontSize: FontSize.sm },
});
