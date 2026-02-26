// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Usa il campo "exports" di package.json per risoluzione cross-platform
config.resolver.unstable_enablePackageExports = true;

// Su web: rimpiazza react-native-reanimated con uno stub compatibile.
// reanimated v4 usa import.meta.url (ES module) per caricare web workers —
// sintassi non supportata da Metro bundler (che genera bundle CJS/IIFE).
// Lo stub espone la stessa API con no-op, senza import.meta.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    if (
      moduleName === 'react-native-reanimated' ||
      moduleName.startsWith('react-native-reanimated/') ||
      moduleName === 'react-native-worklets' ||
      moduleName.startsWith('react-native-worklets/')
    ) {
      return {
        filePath: path.resolve(__dirname, 'stubs/reanimated-web-stub.js'),
        type: 'sourceFile',
      };
    }
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
