module.exports = {
  createOldCatalogs: false,
  indentation: 4,
  lexers: {
    ts: ["TypescriptLexer"],
    tsx: ["TypescriptLexer"],
    js: ["JavascriptLexer"],
    jsx: ["JavascriptLexer"],
    default: ["JavascriptLexer"],
  },
  locales: ["en", "gu", "hi", "mr"],
  output: "app/locales/$LOCALE.json",
  input: ["app/**/*.{js,jsx,ts,tsx}"],
  exclude: [
    "app/locales/**",
    "node_modules/**",
    ".next/**",
    "dist/**",
    "build/**",
  ],
  sort: true,
  useKeysAsDefaultValue: true,
  verbose: true, // Turn on verbose to see what's happening
  failOnWarnings: false,
};
