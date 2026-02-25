import React from 'react';
import { View } from 'react-native';
import { Spacing } from '@/constants/theme';

type SpacerSize = keyof typeof Spacing;

interface SpacerProps {
  size?: SpacerSize;
  horizontal?: boolean;
}

export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const value = Spacing[size];
  return (
    <View style={horizontal ? { width: value } : { height: value }} />
  );
}
