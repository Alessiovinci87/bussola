import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Spacing, TouchTarget, Palette } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppText } from './AppText';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const isDisabled = disabled || loading;

  const containerStyles = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}_${scheme}`] ?? styles[`variant_${variant}_light`],
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const textColor = getTextColor(variant, scheme);

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <AppText
          style={[styles.label, styles[`label_${size}`], { color: textColor }, textStyle]}
          weight="semibold"
        >
          {label}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

function getTextColor(variant: Variant, scheme: 'light' | 'dark'): string {
  switch (variant) {
    case 'primary':
    case 'danger':
      return '#FFFFFF';
    case 'secondary':
      return scheme === 'dark' ? '#F1F5F9' : Palette.gray800;
    case 'ghost':
      return scheme === 'dark' ? '#60A5FA' : Palette.primary;
  }
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.md,
    flexDirection: 'row',
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.45 },

  // Sizes — rispettano TouchTarget.min
  size_sm: { minHeight: TouchTarget.min, paddingHorizontal: Spacing.md },
  size_md: { minHeight: TouchTarget.min + 4, paddingHorizontal: Spacing.lg },
  size_lg: { minHeight: TouchTarget.large, paddingHorizontal: Spacing.xl },

  // Variants light
  variant_primary_light: { backgroundColor: Palette.primary },
  variant_secondary_light: { backgroundColor: Palette.gray100, borderWidth: 1, borderColor: Palette.gray200 },
  variant_ghost_light: { backgroundColor: 'transparent' },
  variant_danger_light: { backgroundColor: Palette.crisisRed },

  // Variants dark
  variant_primary_dark: { backgroundColor: '#3B82F6' },
  variant_secondary_dark: { backgroundColor: '#1E293B', borderWidth: 1, borderColor: '#334155' },
  variant_ghost_dark: { backgroundColor: 'transparent' },
  variant_danger_dark: { backgroundColor: Palette.crisisRedDark },

  // Label sizes
  label: {},
  label_sm: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  label_md: { fontSize: FontSize.md, fontWeight: FontWeight.semibold },
  label_lg: { fontSize: FontSize.lg, fontWeight: FontWeight.bold },
});
