module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: 'cjs',
      },
    ],
    '@babel/preset-typescript',
  ].filter(Boolean),
  plugins: [
    // [
    //   'module-resolver',
    //   {
    //     root: pathsConfig.moduleSearch,
    //     alias: pathsConfig.alias,
    //   },
    // ],
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~/',
        rootPathSuffix: './src/',
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', {legacy: false, decoratorsBeforeExport: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-object-rest-spread', {loose: true, useBuiltIns: true}],
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: false,
        version: '7.9.6',
      },
    ],
  ].filter(Boolean),
  ignore: ['**/*.d.ts'],
  comments: false,
};
