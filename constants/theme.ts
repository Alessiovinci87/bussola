import { Platform } from 'react-native';

// ─── Colori ──────────────────────────────────────────────────────────────────

export const Palette = {
  // Brand
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',

  // Safety levels
  safeGreen: '#16A34A',
  watchYellow: '#D97706',
  alertOrange: '#EA580C',
  crisisRed: '#DC2626',
  crisisRedDark: '#991B1B',
  crisisRedLight: '#FEE2E2',

  // Neutral
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',

  // Dark mode backgrounds
  darkBg: '#0F172A',
  darkSurface: '#1E293B',
  darkBorder: '#334155',
} as const;

export const Colors = {
  light: {
    text: Palette.gray900,
    textSecondary: Palette.gray500,
    background: Palette.gray50,
    surface: Palette.white,
    border: Palette.gray200,
    tint: Palette.primary,
    icon: Palette.gray500,
    tabIconDefault: Palette.gray400,
    tabIconSelected: Palette.primary,
  },
  dark: {
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    background: Palette.darkBg,
    surface: Palette.darkSurface,
    border: Palette.darkBorder,
    tint: '#60A5FA',
    icon: '#94A3B8',
    tabIconDefault: '#64748B',
    tabIconSelected: '#60A5FA',
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ─── Border radius ────────────────────────────────────────────────────────────

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 36,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

// ─── Touch target minimo (principio UX: genitore stressato) ──────────────────

export const TouchTarget = {
  min: 48,   // px — WCAG + Apple HIG
  large: 64, // px — azioni primarie
} as const;

// ─── Ombre ────────────────────────────────────────────────────────────────────

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;
