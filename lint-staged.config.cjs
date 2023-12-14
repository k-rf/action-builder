/** @type { import("lint-staged").Config } */
const config = {
  "*.{tsx,ts}": [
    "bash -c 'pnpm check:type'",
    "prettier --write",
    "eslint --cache --fix",
  ],
  "*.js": ["prettier --write", "eslint --cache --fix"],
  "*.json": ["prettier --write"],
  "*.md": ["prettier --write", "textlint"],
};

module.exports = config;
