import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Variant = 'title' | 'heading' | 'subheading' | 'body' | 'bodyLarge' | 'caption' | 'label';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold';

interface AppTextProps extends TextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  secondary?: boolean;
}

export function AppText({
  variant = 'body',
  weight,
  color,
  secondary = false,
  style,
  ...rest
}: AppTextProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  const resolvedColor = color ?? (secondary ? theme.textSecondary : theme.text);

  return (
    <Text
      style={[styles.base, styles[variant], weight && styles[weight], { color: resolvedColor }, style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    fontWeight: FontWeight.regular,
  },
  // Variants
  title: { fontSize: FontSize.xxxl, fontWeight: FontWeight.bold, lineHeight: 44 },
  heading: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, lineHeight: 34 },
  subheading: { fontSize: FontSize.xl, fontWeight: FontWeight.semibold, lineHeight: 28 },
  bodyLarge: { fontSize: FontSize.lg, fontWeight: FontWeight.regular, lineHeight: 28 },
  body: { fontSize: FontSize.md, fontWeight: FontWeight.regular, lineHeight: 24 },
  caption: { fontSize: FontSize.sm, fontWeight: FontWeight.regular, lineHeight: 20 },
  label: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, lineHeight: 20, letterSpacing: 0.3 },
  // Weights
  regular: { fontWeight: FontWeight.regular },
  medium: { fontWeight: FontWeight.medium },
  semibold: { fontWeight: FontWeight.semibold },
  bold: { fontWeight: FontWeight.bold },
});
