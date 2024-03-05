/// <reference types="cypress" />
import {And, Given, When} from 'cypress-cucumber-preprocessor/steps';
import globalData from '../fixtures/global.json'
import Home_Page from '../pages/Home_Page';
import homeLoan_Page from "../pages/HomeLoan_Page";
import contactUs_Page from "../pages/ContactUs_Page";

Given('User opens the website', () => {
    cy.visit(globalData.url)
    const home_page = new Home_Page();
    cy.verifyVisible(home_page.img_site_logo());
});

When('User navigates to home loan', () => {
    const home_page = new Home_Page();
    cy.clickOnElement(home_page.button_home_loan());
    cy.verifyPageNavigationTo(homeLoan_Page)
});

And('User navigates to contact us from header menu', () => {
    const home_page = new Home_Page();
    cy.clickOnElement(home_page.button_home_loan());
    cy.setAttribute(home_page.button_get_help(), "style", "display:flex")
    cy.clickOnElement(home_page.button_contact_us());
    cy.verifyPageNavigationTo(contactUs_Page)
});

