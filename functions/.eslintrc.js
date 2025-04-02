module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": "off", // Ignore single/double quote errors
    "indent": "off", // Ignore indentation errors
    "max-len": "off", // Disable line length rule
    "comma-dangle": "off", // Ignore trailing comma errors
    "object-curly-spacing": "off", // Ignore space inside curly braces
    "brace-style": "off", // Ignore curly brace style errors
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
