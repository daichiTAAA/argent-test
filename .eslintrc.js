module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  globals: {
    web3: true,
    assert: true,
    contract: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unpublished-require": ["error", { devDependencies: true }],
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "max-len": [2, { code: 150, ignoreComments: true }],
    quotes: [2, "double", "avoid-escape"],
    "no-console": "off",
    "no-underscore-dangle": "off",
    "no-await-in-loop": "off",
    "no-restricted-syntax": "off",
    "guard-for-in": "off",
    "function-paren-newline": "off",
    "comma-dangle": "off",
    "object-curly-newline": "off",
    "no-unused-expressions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
  },
};
