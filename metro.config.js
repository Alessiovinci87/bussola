// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Usa il campo "exports" di package.json per risoluzione cross-platform
config.resolver.unstable_enablePackageExports = true;

// Su web: rimpiazza react-native-reanimated e react-native-worklets con stub compatibili.
// Entrambe le librerie usano import.meta.url (ES module) per caricare web workers —
// sintassi non supportata da Metro bundler (che genera bundle CJS/IIFE).
// Intercettiamo TUTTI i subpath (es. react-native-reanimated/src/xyz) perché
// navigation o altre librerie possono importare da percorsi non previsti.
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
