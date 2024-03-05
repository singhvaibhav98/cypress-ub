const {defineConfig} = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
    projectId: 'j7zetb',
    experimentalCspAllowList: true,
    experimentalWebKitSupport: true,
    includeShadowDom: true,
    chromeWebSecurity: false,
    experimentalSourceRewriting: true,
    screenshotsFolder: 'reports/mochawesome/screenshots',
    screenshotOnRunFailure: true,
    viewportWidth: 1536,
    viewportHeight: 960,
    e2e: {
        defaultCommandTimeout: 1000,
        experimentalRunAllSpecs: true,
        setupNodeEvents(on, config) {
            on('file:preprocessor', cucumber());
            require('cypress-mochawesome-reporter/plugin')(on);
            return config;
        },
        specPattern: 'cypress/(e2e|api)/*.*',
        supportFile: "cypress/support/commands.js",
    },
    reporter: 'cypress-mochawesome-reporter',
    video: false,
    reporterOptions: {
        reportDir: 'reports/mochawesome',
        charts: true,
        reportPageTitle: 'Test Automation Result',
        embeddedScreenshots: true,
        inlineAssets: false,
        saveAllAttempts: true,
        debug: true,
    }
});
