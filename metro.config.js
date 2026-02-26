// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Usa il campo "exports" in package.json per risolvere correttamente
// i moduli per ogni piattaforma (evita import.meta da codice non-browser).
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
