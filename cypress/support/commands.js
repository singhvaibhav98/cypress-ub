import addContext from 'mochawesome/addContext';
import "cypress-real-events";
import 'cypress-mochawesome-reporter/register';

/**
 * Add context in report
 */
function addTestContext(title, value) {
    cy.once('test:after:run', (test) => addContext({test}, {title, value}));
}

/**
 * Take screenshot and attach in report
 */
function takeScreenshot(message) {
    message = message.split(' ').join('_');
    cy.screenshot(message, {overwrite: true, capture: 'viewport'});
    const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.testingType
    }/${Cypress.spec.name
    }/${message}.png`;
    addTestContext("Screenshot", screenshot);
}


/**
 * Add logs in report
 */
Cypress.Commands.add('logMessage', (message) => {
    addTestContext("Log", message);
    takeScreenshot(message);
})

/**
 * Set custom attribute in dom object
 */
Cypress.Commands.add('setAttribute', (locator, type, attr) => {
    locator[0].invoke('attr', type, attr);
    addTestContext("Set Attribute " + type + ":" + attr, locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Click on element, log and attach screenshot
 */
Cypress.Commands.add('clickOnElement', (locator) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].click();
    addTestContext("Click", locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Click on element using real click event, log and attach screenshot
 */
Cypress.Commands.add('realClickOnElement', (locator) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].realClick();
    addTestContext("Click", locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Get object using the attribute
 */
function getObject(maker) {
    return new maker();
}

/**
 * Verify page navigation
 */
Cypress.Commands.add('verifyPageNavigationTo', (page) => {
    cy.url().should('include', getObject(page).pageURLPath);
    addTestContext("Page navigation validated to page : " + getObject(page).pageName);
    takeScreenshot("Page navigation validated to page " + getObject(page).pageName);
})

/**
 * Verify text is equal to the value passed
 */
Cypress.Commands.add('verifyEqualValue', (locator, text) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].should('have.value', text);
    addTestContext("Verify equals", locator[1] + " on page : " + locator[2] + " have text : " + text);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Verify element is visible
 */
Cypress.Commands.add('verifyVisible', (locator) => {
    locator[0].should('be.visible');
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    addTestContext("Verify visible", locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Verify list is visible
 */
Cypress.Commands.add('verifyListVisible', (locator) => {
    locator[0].should('have.length.greaterThan', 1);
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    addTestContext("Verify list visible", locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 * Select item from dropdown, add log message and take screenshot
 */
Cypress.Commands.add('selectFromDropdown', (locator, text) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].select(text);
    addTestContext("Select from dropdown", locator[1] + " on page : " + locator[2] + " select option : " + text);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 *Type text in field, add log message and take screenshot
 */
Cypress.Commands.add('typeText', (locator, text) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].clear().type(text);
    addTestContext("Type", "\"" + text + "\" in " + locator[1] + " on page :" + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 *Verify all items from list contains text, add log message and take screenshot
 */
Cypress.Commands.add('verifyContains', (locator, text) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].then(($items) => {
        expect($items).to.contain(text);
    });
    addTestContext("Verify Text Contains", "\"" + text + "\" contains in all " + locator[1] + " on page :" + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
})

/**
 *Hover over element, add log message and take screenshot
 */
Cypress.Commands.add('hover', (locator) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].realHover().wait(5000);
    addTestContext("Hover", locator[1] + " on page :" + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
});

/**
 *Force click with no scroll, add log message and take screenshot
 */
Cypress.Commands.add('clickNoScroll', (locator) => {
    cy.setAttribute(locator, "style", "border: red; border-width: thick; border-style: solid;")
    locator[0].click({scrollBehaviour: false, force: true})
    addTestContext("Click", locator[1] + " on page : " + locator[2]);
    takeScreenshot(locator[1] + " " + locator[2]);
});

/**
 * Take screenshot on failure, add log message
 */
Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.testingType}/${Cypress.spec.name}
    /${runnable.parent.title} -- ${test.title} (failed).png`;
        addTestContext("Test status :" + test.state, screenshot);
    }
});

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})