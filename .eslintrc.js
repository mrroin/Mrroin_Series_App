module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: true,
        trailingComma: "all",
        singleQuote: false,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: "auto",
      },
    ],
  },
};
