/**
 * GestureRoot.tsx — versione nativa
 * Usa GestureHandlerRootView per inizializzare react-native-gesture-handler.
 */
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props {
  children: React.ReactNode;
}

export function GestureRoot({ children }: Props) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
}
