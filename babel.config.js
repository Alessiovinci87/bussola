module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      /**
       * Metro genera bundle IIFE/CJS, non ES module.
       * Alcune dipendenze (react-native-reanimated v4, react-native-gesture-handler)
       * usano `import.meta.url` nel codice web — sintassi valida solo in ES module.
       * Il browser lancia SyntaxError appena prova a parsare il bundle,
       * bloccando TUTTO prima di eseguire una singola istruzione.
       *
       * Questo plugin Babel intercetta ogni `import.meta` durante la
       * trasformazione e lo rimpiazza con `{ url: '' }` — compatibile
       * con Metro e sicuro su tutte le piattaforme.
       */
      function replaceImportMeta({ types: t }) {
        return {
          name: 'replace-import-meta',
          visitor: {
            MetaProperty(path) {
              if (
                path.node.meta.name === 'import' &&
                path.node.property.name === 'meta'
              ) {
                path.replaceWith(
                  t.objectExpression([
                    t.objectProperty(
                      t.identifier('url'),
                      t.stringLiteral('')
                    ),
                  ])
                );
              }
            },
          },
        };
      },
    ],
  };
};
