import '@cypress/xpath';
class Home_Page {
    pageName = "Home Page"
    pageURLPath = "/"
    img_site_logo() { return [cy.get('.pw-header__logo > pw-logo > .pw-logo'), "Site logo", this.pageName] }
    button_home_loan() { return [cy.get(':nth-child(2) > .pw-product-tiles__link'), 'Get help button', this.pageName] }
}
export default Home_Page