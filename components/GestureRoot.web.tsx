import React from 'react';
import { View } from 'react-native';
interface Props { children: React.ReactNode; }
export function GestureRoot({ children }: Props) {
  return <View style={{ flex: 1 }}>{children}</View>;
}
