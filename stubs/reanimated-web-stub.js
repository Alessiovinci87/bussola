/**
 * Stub web per react-native-reanimated.
 * Intercettato da metro.config.js su piattaforma web.
 *
 * react-native-reanimated v4 usa import.meta.url per caricare web worker
 * di animazione — sintassi ES module non supportata da Metro bundler.
 * Poiché l'app non usa animazioni reanimated, lo stub restituisce
 * componenti e hook compatibili che non fanno nulla.
 */
'use strict';

const React = require('react');
const { View, Text, Image, ScrollView, FlatList } = require('react-native');

// Shared value compatibile con l'API reanimated
function useSharedValue(initial) {
  const ref = React.useRef({ value: initial });
  return ref.current;
}

// Hook no-op — restituisce oggetto stile vuoto
function useAnimatedStyle() {
  return {};
}

function useAnimatedScrollHandler() {
  return {};
}

function useAnimatedRef() {
  return React.useRef(null);
}

function useScrollViewOffset() {
  return useSharedValue(0);
}

function useDerivedValue(fn) {
  return useSharedValue(fn());
}

// Funzioni di animazione — passthrough del valore finale
function withTiming(toValue) { return toValue; }
function withSpring(toValue) { return toValue; }
function withDecay() { return 0; }
function withDelay(_, animation) { return animation; }
function withRepeat(animation) { return animation; }
function withSequence(...animations) { return animations[animations.length - 1]; }

function cancelAnimation() {}
function runOnJS(fn) { return fn; }
function runOnUI(fn) { return fn; }
function makeMutable(initial) { return { value: initial }; }

function interpolate(value) { return value; }
function interpolateColor() { return 'transparent'; }

const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
const Extrapolate = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };

// Easing compatibile
const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  bezier: () => (t) => t,
  in: (easing) => easing,
  out: (easing) => easing,
  inOut: (easing) => easing,
};

// createAnimatedComponent — restituisce il componente invariato
function createAnimatedComponent(Component) {
  return Component;
}

// Namespace Animated
const Animated = {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  createAnimatedComponent,
};

module.exports = {
  default: Animated,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useScrollViewOffset,
  useDerivedValue,
  withTiming,
  withSpring,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  cancelAnimation,
  runOnJS,
  runOnUI,
  makeMutable,
  interpolate,
  interpolateColor,
  Extrapolation,
  Extrapolate,
  Easing,
  createAnimatedComponent,
  Animated,
};
