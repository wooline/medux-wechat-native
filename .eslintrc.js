module.exports = {
  env: {
    //browser: true,
    es6: true,
    //jest: true,
  },
  globals: {
    global: true,
    setInterval: true,
    clearInterval: true,
    setTimeout: true,
    console: true,
    App: true,
    Page: true,
    Component: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
    Behavior: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint', //屏蔽eslint
    'plugin:prettier/recommended', //转eslint
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-undef': 'error',
    'sort-imports': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: {},
  overrides: [
    {
      files: ['**/*.js', '**/*.wxs'],
      env: {
        browser: false,
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.wxs'],
      env: {
        browser: false,
        node: false,
      },
      globals: {
        module: true,
        getRegExp: true,
        getDate: true,
      },
    },
  ],
};
