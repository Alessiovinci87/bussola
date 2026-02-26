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
  { emoji: '🛡', text: 'Metti il bambino in un posto sicuro', sub: 'Lettino, box, stanza sicura' },
  { emoji: '🚪', text: 'Esci dalla stanza', sub: 'Anche solo 5 minuti bastano' },
  { emoji: '📞', text: 'Chiama qualcuno adesso', sub: 'Partner, genitore, amico — non restare solo' },
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
          <AppText style={styles.title}>Fermati un momento</AppText>
          <Spacer size="xs" />
          <AppText style={styles.subtitle}>
            Sembra una situazione difficile. Fai queste 3 cose adesso:
          </AppText>
          <Spacer size="lg" />
          {ACTIONS.map((action, i) => (
            <View key={i} style={styles.actionCard}>
              <AppText style={styles.actionEmoji}>{action.emoji}</AppText>
              <View style={styles.actionText}>
                <AppText style={styles.actionTitle}>{action.text}</AppText>
                <AppText style={styles.actionSub}>{action.sub}</AppText>
              </View>
            </View>
          ))}
          <Spacer size="xl" />
          <Pressable
            style={({ pressed }) => [styles.resolveButton, pressed && { opacity: 0.85 }]}
            onPress={onResolve}
            accessibilityRole="button"
            accessibilityLabel="La crisi è passata"
          >
            <AppText style={styles.resolveLabel} weight="bold">La crisi è passata</AppText>
          </Pressable>
          <Spacer size="sm" />
          <AppText style={styles.disclaimer}>
            Bussola non sostituisce supporto professionale.{'\n'}
            In caso di pericolo immediato chiama il 112.
          </AppText>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Palette.crisisRedDark },
  content: { flex: 1, padding: Spacing.lg, justifyContent: 'center' },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontSize: FontSize.md, color: 'rgba(255,255,255,0.85)', textAlign: 'center', lineHeight: 24 },
  actionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.sm, gap: Spacing.md },
  actionEmoji: { fontSize: 32 },
  actionText: { flex: 1 },
  actionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: '#FFFFFF', lineHeight: 24 },
  actionSub: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  resolveButton: { backgroundColor: '#FFFFFF', borderRadius: Radius.xl, minHeight: TouchTarget.large, alignItems: 'center', justifyContent: 'center' },
  resolveLabel: { color: Palette.crisisRedDark, fontSize: FontSize.lg },
  disclaimer: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 18 },
});
