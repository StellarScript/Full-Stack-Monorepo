const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
      ...createGlobPatternsForDependencies(__dirname),
   ],

   theme: {
      darkMode: "class",
      extend: {
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

         colors: {
            lightgray: {
               DEFAULT: "rgba(0, 0, 0, 0.06)",
               100: "rgb(110 110 110 / 6%)",
               200: "rgb(157 157 157 / 6%)",
               300: "rgb(190 188 188 / 6%)",
            },

            primary: {
               DEFAULT: "var(--color-primary)",
               950: "var(--color-primary-950)",
               900: "var(--color-primary-900)",
               800: "var(--color-primary-800)",
               700: "var(--color-primary-700)",
               600: "var(--color-primary-600)",
               500: "var(--color-primary-500)",
               400: "var(--color-primary-400)",
               300: "var(--color-primary-300)",
               200: "var(--color-primary-200)",
               100: "var(--color-primary-100)",
               hover: "var(--color-primary-hover)",
               active: "var(--color-primary-active)",
               light: "var(--color-primary-light)",
               dark: "var(--color-primary-dark)",
            },

            secondary: {
               layer2: "var(--color-layer2-content-secondary)",
               active: "var(--color-secondary-button-bg-active)",
            },

            body: {
               DEFAULT: "var(--color-text)",
               200: "var(--color-text-200)",
               300: "var(--color-text-300)",
               table: "var(--color-text-table-of-contents)",
            },

            button: {
               DEFAULT: "var(--color-button-color)",
            },

            border: {
               light: "var(--color-light-border)",
            },

            status: {
               warning: "var(--color-warning)",
               warningLink: "var(--color-warning-link)",
               warningLinkHover: "var(--color-warning-link-hover)",
            },

            gradient: {
               upgrade: "var(--color-upgrades-gradient)",
               node: "var(--color-run-node-gradient)",
               node2: "var(--color-run-node-gradient2)",
               card: "var(--color-card-gradient)",
               layer2:
                  "linear-gradient(83.46deg, rgba(127, 127, 213, 0.2) 7.03%, rgba(138, 168, 231, 0.2) 52.42%, rgba(145, 234, 228, 0.2) 98.77%), #1E1E1E",
               feedback: "linear-gradient(83.46deg, #2C2C32 7.03%, #44404D 52.42%, #303038 98.77%)",
               bannergrid: "linear-gradient(90deg, rgba(172, 182, 229, 0.08) 0%, rgba(134, 253, 232, 0.08) 100%)",
            },

            slider: {
               bg: "var(--color-slider-bg)",
               border: "var(--color-slider-border)",
               dot: "var(--color-slider-dot)",
               dotactive: "var(--color-slider-dot-active)",
               btnbg: "var(--color-slider-btn-bg)",
               color: "var(--color-slider-btn-color)",
               disabled: "var(--color-slider-btn-bg-disabled)",
               disabled: "var(--color-slider-btn-color-disabled)",
            },

            staking: {
               pill: "var(--color-staking-pill-platform)",
               pillui: "var(--color-staking-pill-ui)",
               gold: "var(--color-staking-gold)",
               goldfill: "var(--color-staking-gold-fill)",
               green: "var(--color-staking-green)",
               greenfill: "var(--color-staking-green-fill)",
               blue: "var(--color-staking-blue)",
               bluefill: "var(--color-staking-blue-fill)",
               red: "var(--color-staking-red)",
               redfill: "var(--color-staking-red-fill)",
            },

            box: {
               shadow: "var(--color-card-box-shadow)",
               tableshadow: "var(--color-table-box-shadow)",
               itemshadow: "var(--color-table-item-box-shadow)",
               mint: "var(--color-home-box-mint)",
               turquoise: "var(--color-home-box-Turquoise)",
               orange: "var(--color-home-box-orange)",
               purple: "var(--color-home-box-purple)",
               pink: "var(--color-home-box-pink)",
            },

            background: {
               DEFAULT: "var(--color-bg)",
               ghostcard: "var(--color-ghost-card-bg)",
               search: "var(--color-search-bg)",
               searchempty: "var(--color-search-bg-empty)",
               searchresult: "var(--color-search-result-bg)",

               card: "var(--color-price-card-bg)",
               cardpositive: "var(--color-price-card-bg-positive)",
               cardnegative: "var(--color-price-card-bg-negative)",
               status: "var(--color-upgrade-status-shipped-bg)",
               modal: "var(--color-modal-bg)",

               dropdown: "var(--color-dropdown-bg)",
               dropdownhover: "var(--color-dropdown-bg-hover)",
               off: "var(--color-off-bg)",
               code: "var(--color-code-bg)",
               mark: "var(--color-mark-bg)",
               edn: "var(--color-edn-bg)",
               pre: "var(--color-pre-bg)",
               tablehover: "var(--color-table-bg-hover)",
               gray: "var(--color-gray-bg)",
               upgradestatus: "var(--color-upgrade-status-bg)",
            },

            border: {
               DEFAULT: "var(--color-border)",
               card: "var(--price-card-border)",
               cardnegative: "var(--color-price-card-border-negative)",
               search: "var(--color-search-border)",
               dropdown: "var(--color-dropdown-border)",
               pre: "var(--color-pre-border)",
               status: "var(--color-upgrade-status-border)",
               upgradeStatus: "var(--color-upgrade-status-shipped-border)",
               mainnet: "var(--color-mainnet-border)",
               beaconchain: "var(--color-beacon-chain-border)",
               shard: "var(--color-shard-border)",
            },

            beta: "var(--color-beta)",
            ghostCardGhost: "var(--color-ghost-card-ghost)",
            searchResultText: "var(--color-search-result-text)",
            selectHover: "var(--color-select-hover)",
            selectActive: "var(--color-select-active)",
            markUnderline: "var(--color-mark-underline)",

            homeDivider: "var(--color-home-divider)",
            displayDark: "var(--color-display-dark)",
            displayLight: "none",
            tagMint: "var(--color-mainnet)",
            mainnet: "var(--color-mainnet)",
            beaconchain: "var(--color-beacon-chain)",
            shard: "var(--color-shard)",
            link: "var(--color-info-link)",
            linkHover: "var(--color-info-link-hover)",
            rollupDevDocList: "var(--color-rollup-devdoc-list)",
         },
      },
   },
   plugins: [],
};
