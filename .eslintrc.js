module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['react-app'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  globals: {
    baseDir: 'readonly',
    files: 'readonly',
  },
};
