module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
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
