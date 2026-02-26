import { Platform } from 'react-native';

// ─── Colori ──────────────────────────────────────────────────────────────────

export const Palette = {
  // Brand — Indaco calmo (più rassicurante del blu elettrico)
  primary: '#5B6AF9',
  primaryDark: '#4355E0',
  primaryLight: '#EDEFFF',
  primaryMid: '#8B98FB',

  // Safety levels
  safeGreen: '#16A34A',
  safeGreenLight: '#DCFCE7',
  watchYellow: '#D97706',
  watchYellowLight: '#FEF9C3',
  alertOrange: '#EA580C',
  alertOrangeLight: '#FFEDD5',
  crisisRed: '#DC2626',
  crisisRedDark: '#991B1B',
  crisisRedLight: '#FEE2E2',

  // Neutral — leggera tinta fredda per un feel calmo
  white: '#FFFFFF',
  gray50: '#F7F8FD',
  gray100: '#EFF0F9',
  gray200: '#E2E4EF',
  gray300: '#C8CADF',
  gray400: '#9698B4',
  gray500: '#6B6E8C',
  gray600: '#4C5068',
  gray700: '#373A54',
  gray800: '#23253C',
  gray900: '#14162A',
  black: '#000000',

  // Dark mode
  darkBg: '#0E0F1E',
  darkSurface: '#171829',
  darkSurface2: '#1E2038',
  darkBorder: '#2D3052',
} as const;

export const Colors = {
  light: {
    text: Palette.gray900,
    textSecondary: Palette.gray500,
    background: Palette.gray50,
    surface: Palette.white,
    surfaceElevated: Palette.white,
    border: Palette.gray200,
    borderStrong: Palette.gray300,
    tint: Palette.primary,
    icon: Palette.gray500,
    tabIconDefault: Palette.gray400,
    tabIconSelected: Palette.primary,
  },
  dark: {
    text: '#EEF0FF',
    textSecondary: '#9698B4',
    background: Palette.darkBg,
    surface: Palette.darkSurface,
    surfaceElevated: Palette.darkSurface2,
    border: Palette.darkBorder,
    borderStrong: '#3D4168',
    tint: Palette.primaryMid,
    icon: '#9698B4',
    tabIconDefault: '#6B6E8C',
    tabIconSelected: Palette.primaryMid,
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
  xxl: 32,
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

// ─── Touch target ─────────────────────────────────────────────────────────────

export const TouchTarget = {
  min: 48,
  large: 56,
} as const;

// ─── Ombre — tinte con il colore primario per un feel premium ─────────────────

export const Shadow = {
  sm: {
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  md: {
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  lg: {
    shadowColor: Palette.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;
