const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
      ...createGlobPatternsForDependencies(__dirname),
   ],
   theme: {
      extend: {
         colors: {
            skeleton: {
               DEFAULT: "rgba(0, 0, 0, 0.06)",
               100: "rgb(110 110 110 / 6%)",
               200: "rgb(157 157 157 / 6%)",
               300: "rgb(190 188 188 / 6%)",
            },
         },
         fontSize: {
            xxs: ["0.75rem", { fontWeight: "300" }], // 12px
            xs: ["0.875rem", { fontWeight: "300" }], // 14px
            sm: ["0.9375rem", { fontWeight: "400" }], // 15px
            base: ["1rem", { fontWeight: "400" }], // 16px
            lg: ["1.125rem", { fontWeight: "400" }], // 18px
            xl: ["1.25rem", { fontWeight: "500" }], // 20px
            "2xl": ["1.5rem", { fontWeight: "500" }], // 24px
            "3xl": ["1.875rem", { fontWeight: "600" }], // 30px
            "4xl": ["2.25rem", { fontWeight: "700" }], // 36px
            "5xl": ["3rem", { fontWeight: "800" }], // 48px
            "6xl": ["3.75rem", { fontWeight: "900" }], // 60px
            "7xl": ["4.5rem", { fontWeight: "900" }], // 72px
            "8xl": ["6rem", { fontWeight: "900" }], // 96px
            "9xl": ["8rem", { fontWeight: "900" }], // 128px
         },
         fontFamily: {
            inter: ["var(--font-inter)"],
            lato: ["var(--font-lato)"],
         },
      },
   },
   plugins: [],
};
