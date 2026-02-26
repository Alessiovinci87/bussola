import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Colors, Radius, Shadow, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevated?: boolean;
}

export function Card({ children, style, padding = 'md', elevated = false }: CardProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: elevated ? theme.surfaceElevated : theme.surface },
        padding !== 'none' && styles[`pad_${padding}`],
        elevated ? Shadow.md : Shadow.sm,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.xl,
  },
  pad_sm: { padding: Spacing.sm + 4 },
  pad_md: { padding: Spacing.md },
  pad_lg: { padding: Spacing.lg },
});
