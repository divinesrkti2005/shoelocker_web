module.exports = {
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.test.js",
    "<rootDir>/src/**/*.test.jsx"
  ],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
}; 