/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@trivago/prettier-plugin-sort-imports",
  ],
  endOfLine: "lf",
  importOrderSeparation: true,
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "interface",
    "(?=content|api)",
    "context/",
    "mock/",
    "config",
    "provider/",
    "lib/",
    "utils/",
    "hooks/",
    "server/",
    "trpc/",
    "(components/|./index)",
    "env.js",
    ".svg",
    "^../(.*)$",
    "styles",
    "(?=./styles.module.scss)",
  ],
};

export default config;
