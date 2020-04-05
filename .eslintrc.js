module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ["react-app"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  globals: {
    files: "readonly",
    corePkg: "readonly",
  },
};
