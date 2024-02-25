// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
   extends: ["next", "prettier", "react-app", "plugin:tailwindcss/recommended", "../../.eslintrc.json"],
   parserOptions: {
      babelOptions: {
         presets: [require.resolve("next/babel")],
      },
   },
   rules: {
      "tailwindcss/classnames-order": "off",
      "tailwindcss/no-custom-classname": "off",
      "testing-library/prefer-screen-queries": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-unused-vars": [
         "warn",
         {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
         },
      ],
   },
};
