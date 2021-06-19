const path = require('path');

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        "jest/globals": true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: '.',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', '@typescript-eslint', 'eslint-plugin-import-helpers', 'jest'],
    rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-this-alias': 0,
        '@typescript-eslint/no-empty-function': 0,
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'never',
                groups: ['/^[a-z].*$/', '/^@.*$/', 'module', ['parent', 'sibling', 'index']],
                alphabetize: {order: 'asc'},
            },
        ],
    },
};
