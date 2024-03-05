/// <reference types="cypress" />
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import globalData from '../fixtures/global.json'
import testData from '../fixtures/test.json'
import Home_Page from '../pages/Home_Page';
import homeLoan_Page from "../pages/HomeLoan_Page";

Given('User opens the website', () => {
    cy.logMessage("Visit Ubank website")
    cy.visit(globalData.url)
    const home_page = new Home_Page();
    cy.verifyVisible(home_page.img_site_logo());
});

When('User navigates to home loan', () => {
    const home_page = new Home_Page();
    cy.logMessage("Visit Ubank website")
    cy.hover(home_page.button_home_loan())
    cy.clickOnElement(home_page.button_home_loan());
    cy.verifyPageNavigationTo(homeLoan_Page)
});