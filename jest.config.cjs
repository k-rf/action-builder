/** @type { import("jest").Config } */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  moduleFileExtensions: ["ts", "json", "js"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = config;
