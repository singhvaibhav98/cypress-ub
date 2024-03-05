import '@cypress/xpath';

class Home_Page {
    pageName = "Home Page"
    pageURLPath = "/"

    img_site_logo() {
        return [cy.get('.pw-header__logo > pw-logo > .pw-logo'), "Site logo", this.pageName]
    }

    button_home_loan() {
        return [cy.get(':nth-child(2) > .pw-product-tiles__link'), 'Home loan button', this.pageName]
    }

    button_get_help() {
        return [cy.get('body > pw-root > pw-pages > pw-header > header > nav > div > pw-navigation > nav > div.pw-nav__menu.pw-nav__desktop-nav > div:nth-child(5) > div'), 'Navigation menu', this.pageName]
    }

    button_contact_us() {
        return [cy.xpath('//a[@pw-automation-id="pw-nav-header-link-5-column-2-link-2"]'), 'contact us', this.pageName]
    }
}

export default Home_Page