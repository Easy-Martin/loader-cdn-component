module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["react"],
  extends: [ "plugin:react/recommended"],
  rules: {
    "comma-dangle": 0,
    "react/jsx-uses-vars": 1,
    "react/display-name": 1,
    "no-unused-vars": "warn",
    "no-console": "off",
    "no-unexpected-multiline": "warn"
  },
  settings: {
    react: {
      pragma: "React"
    }
  }
};
