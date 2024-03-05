const {defineConfig} = require("cypress");

module.exports = defineConfig({
    projectId: 'dbdpvb',
    experimentalCspAllowList: true,
    experimentalWebKitSupport: true,
    includeShadowDom: true,
    chromeWebSecurity: false,
    experimentalSourceRewriting: true,
    screenshotsFolder: 'reports/screenshots',
    screenshotOnRunFailure: true,
    viewportWidth: 1536,
    viewportHeight: 960,
    e2e: {
        defaultCommandTimeout: 10000,
        experimentalRunAllSpecs: true,
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
            require('./cypress/plugins/index.js')(on, config)
            return config;
        },
        specPattern: 'cypress/e2e/*.feature',
        supportFile: "cypress/support/commands.js",
        env: {
            allureReuseAfterSpec: true
        }
    },
    reporter: 'cypress-mochawesome-reporter',
    video: true,
    reporterOptions: {
        reportDir: 'reports/mochawesome',
        charts: true,
        reportPageTitle: 'Test Automation Result',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: true,
        debug: true,
    }
});
