module.exports = {
    env: {
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint'
    ],
    root: true,
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        semi: 'error',
        quotes: [2, 'single', { 'avoidEscape': true }],
        'no-unused-vars': 'error',
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 2],
        '@typescript-eslint/no-empty-function': 'off'
    }
}
