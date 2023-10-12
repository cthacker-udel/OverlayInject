module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "problems",
    "plugin:jsx-a11y/recommended",
    "plugin:compat/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  globals: {
    JSX: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  ignorePatterns: ["*.js", "next-env.d.ts", "next.config.mjs"],
  overrides: [],
  rules: {},
  settings: {
    react: {
      version: "16.8",
    },
    jest: {
      version: 26,
    },
  },
};
