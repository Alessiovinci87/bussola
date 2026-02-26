import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { Spacer } from '@/components/ui/Spacer';
import { Palette, Spacing, Radius, FontSize, TouchTarget } from '@/constants/theme';

interface CrisisOverlayProps {
  visible: boolean;
  onResolve: () => void;
}

const ACTIONS = [
  {
    number: '1',
    emoji: '🛡',
    text: 'Metti il bambino in un posto sicuro',
    sub: 'Lettino, box, stanza sicura',
  },
  {
    number: '2',
    emoji: '🚪',
    text: 'Esci dalla stanza',
    sub: 'Anche solo 5 minuti bastano',
  },
  {
    number: '3',
    emoji: '📞',
    text: 'Chiama qualcuno adesso',
    sub: 'Partner, genitore, amico — non restare solo',
  },
];

export function CrisisOverlay({ visible, onResolve }: CrisisOverlayProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      presentationStyle="fullScreen"
      onRequestClose={() => {}}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerBadge}>
            <AppText style={styles.headerBadgeText}>SITUAZIONE DI CRISI</AppText>
          </View>
          <Spacer size="md" />
          <AppText style={styles.title}>Fermati un momento</AppText>
          <Spacer size="xs" />
          <AppText style={styles.subtitle}>
            Sembra una situazione difficile.{'\n'}Fai queste 3 cose adesso:
          </AppText>

          <Spacer size="xl" />

          {/* Azioni */}
          {ACTIONS.map((action, i) => (
            <View key={i} style={styles.actionCard}>
              <View style={styles.actionLeft}>
                <View style={styles.actionNumber}>
                  <AppText style={styles.actionNumberText}>{action.number}</AppText>
                </View>
                {i < ACTIONS.length - 1 && <View style={styles.actionConnector} />}
              </View>
              <View style={styles.actionBody}>
                <AppText style={styles.actionEmoji}>{action.emoji}</AppText>
                <View style={styles.actionText}>
                  <AppText style={styles.actionTitle}>{action.text}</AppText>
                  <AppText style={styles.actionSub}>{action.sub}</AppText>
                </View>
              </View>
            </View>
          ))}

          <Spacer size="xl" />

          {/* Bottone risoluzione */}
          <Pressable
            style={({ pressed }) => [styles.resolveButton, pressed && { opacity: 0.9 }]}
            onPress={onResolve}
            accessibilityRole="button"
            accessibilityLabel="La crisi è passata"
          >
            <AppText style={styles.resolveLabel} weight="bold">
              La crisi è passata
            </AppText>
          </Pressable>

          <Spacer size="md" />
          <AppText style={styles.disclaimer}>
            Bussola non sostituisce supporto professionale.{'\n'}
            In caso di pericolo immediato chiama il{' '}
            <AppText style={[styles.disclaimer, styles.emergencyNumber]}>112</AppText>.
          </AppText>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#7F1D1D' },
  content: { flex: 1, padding: Spacing.lg, justifyContent: 'center' },

  headerBadge: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  headerBadgeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  title: {
    fontSize: FontSize.xxl + 4,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.80)',
    textAlign: 'center',
    lineHeight: 24,
  },

  actionCard: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  actionLeft: {
    alignItems: 'center',
    width: 36,
    marginRight: Spacing.md,
  },
  actionNumber: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  actionNumberText: {
    color: '#FFFFFF',
    fontSize: FontSize.md,
    fontWeight: '800',
  },
  actionConnector: {
    width: 2,
    flex: 1,
    minHeight: Spacing.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 1,
    marginVertical: 4,
  },
  actionBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  actionEmoji: { fontSize: 26, lineHeight: 34 },
  actionText: { flex: 1 },
  actionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  actionSub: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 3,
    lineHeight: 20,
  },

  resolveButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.xl,
    minHeight: TouchTarget.large,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  resolveLabel: {
    color: '#7F1D1D',
    fontSize: FontSize.lg,
  },

  disclaimer: {
    fontSize: FontSize.xs,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    lineHeight: 18,
  },
  emergencyNumber: {
    fontWeight: '700',
    color: 'rgba(255,255,255,0.70)',
  },
});
