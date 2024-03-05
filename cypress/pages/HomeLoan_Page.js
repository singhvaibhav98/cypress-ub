import '@cypress/xpath';

class HomeLoan_Page {
    pageName = "Home Loan Page"
    pageURLPath = "/home-loans"

    img_site_logo() {
        return [cy.get('.pw-header__logo > pw-logo > .pw-logo'), "Site logo", this.pageName]
    }
}

export default HomeLoan_Page