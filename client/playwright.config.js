// module.exports = {
//   testDir: './tests', // Only run tests in the `tests` folder (e.g., fitnest.spec.js)
//   webServer: {
//     command: 'npm start', // Starts your frontend (React)
//     url: 'http://localhost:3000', // Frontend URL
//     timeout: 120 * 1000, // Wait for frontend to start
//     reuseExistingServer: !process.env.CI, // Reuse your running frontend
//   },
//   use: {
//     baseURL: 'http://localhost:3000', // Frontend base URL
//     headless: true, // Run tests without a browser UI
//     viewport: { width: 1280, height: 720 }, // Default viewport
//   },
//   projects: [
//     {
//       name: 'chromium',
//       use: { browserName: 'chromium' },
//     },
//   ],
// };


module.exports = {
  testDir: './tests', // Only run tests in the `tests` folder (e.g., fitnest.spec.js)
  webServer: {
    command: 'npm start', // Starts your frontend (React)
    url: 'http://localhost:3000', // Frontend URL
    timeout: 120 * 1000, // Wait for frontend to start
    reuseExistingServer: !process.env.CI, // Reuse your running frontend
  },
  use: {
    baseURL: 'http://localhost:3000', // Frontend base URL
    headless: true, // Run tests without a browser UI
    viewport: { width: 1280, height: 720 }, // Default viewport
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }, // Runs in Chrome-based browsers
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }, // Runs in Mozilla Firefox
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }, // Runs in Safari/WebKit
    },
  ],
};
