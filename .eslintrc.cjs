/*
 * @Date: 2022-11-10 15:13:45
 * @LastEditors: baiyelatte baiyelatte@gmail.com
 * @LastEditTime: 2022-11-11 14:23:30
 * @FilePath: \vite_vue2.7\.eslintrc.cjs
 */
module.exports = {
  globals: {
    LukeappApi: true
  },
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },

  rules: {
    'vue/require-prop-type-constructor': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/valid-define-props': 'off',
    'vue/no-reserved-component-names': 'off',
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': import.meta.env.VITE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.VITE_ENV === 'production' ? 'warn' : 'off',
  },
}
