/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "es5",
  semi: false,
  endOfLine: "lf",
};

export default config;
