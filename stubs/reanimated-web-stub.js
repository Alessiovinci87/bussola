'use strict';
const React = require('react');
const { View, Text, Image, ScrollView, FlatList } = require('react-native');
function useSharedValue(initial) { const ref = React.useRef({ value: initial }); return ref.current; }
function useAnimatedStyle() { return {}; }
function useAnimatedScrollHandler() { return {}; }
function useAnimatedRef() { return React.useRef(null); }
function useScrollViewOffset() { return useSharedValue(0); }
function useDerivedValue(fn) { return useSharedValue(fn()); }
function withTiming(v) { return v; }
function withSpring(v) { return v; }
function withDecay() { return 0; }
function withDelay(_, a) { return a; }
function withRepeat(a) { return a; }
function withSequence(...a) { return a[a.length - 1]; }
function cancelAnimation() {}
function runOnJS(fn) { return fn; }
function runOnUI(fn) { return fn; }
function makeMutable(v) { return { value: v }; }
function interpolate(v) { return v; }
function interpolateColor() { return 'transparent'; }
const Extrapolation = { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' };
const Extrapolate = Extrapolation;
const Easing = { linear: t => t, ease: t => t, bezier: () => t => t, in: e => e, out: e => e, inOut: e => e };
function createAnimatedComponent(C) { return C; }
const Animated = { View, Text, Image, ScrollView, FlatList, createAnimatedComponent };
module.exports = { default: Animated, useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, useAnimatedRef, useScrollViewOffset, useDerivedValue, withTiming, withSpring, withDecay, withDelay, withRepeat, withSequence, cancelAnimation, runOnJS, runOnUI, makeMutable, interpolate, interpolateColor, Extrapolation, Extrapolate, Easing, createAnimatedComponent, Animated };
