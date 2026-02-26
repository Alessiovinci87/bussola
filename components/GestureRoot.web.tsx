/**
 * GestureRoot.web.tsx — versione web
 * react-native-gesture-handler usa import.meta (ES module) incompatibile
 * con Metro bundler su web. Su web non serve: Pressable usa onClick nativo.
 */
import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export function GestureRoot({ children }: Props) {
  return <View style={{ flex: 1 }}>{children}</View>;
}
