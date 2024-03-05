describe('Petstore API Tests', () => {
    beforeEach(() => {
        cy.visit('https://petstore.swagger.io/');
    });

    it('should create a pet if could not find', () => {
        // Find the pet by ID
        cy.request({
            method: 'GET',
            url: '/v2/pet/1500',
            failOnStatusCode: false
        }).then(response => {
            if (response.status === 404) {
                // Create a new pet if not found
                cy.request('POST', '/v2/pet', {
                    id: 1500,
                    name: 'Tommy',
                    status: 'available'
                }).then(response => {
                    expect(response.status).to.equal(200);
                });
            }
        });
    });

    it('should find and update a pet', () => {
        cy.request('GET', '/v2/pet/1500')
            .its('body')
            .then(pet => {
                // Ensure the pet is found
                expect(pet).to.have.property('name', 'Tommy');
                expect(pet).to.have.property('status', 'available');

                pet.status = 'sold';
                return cy.request('PUT', '/v2/pet', pet);
            })
            .then(response => {
                expect(response.status).to.equal(200);
            });
    });

    it('should find and update pet name', () => {
        cy.request('GET', '/v2/pet/1500')
            .its('body')
            .then(pet => {
                expect(pet).to.have.property('name', 'Tommy');
                pet.name = 'Jumbo';
                return cy.request('PUT', '/v2/pet', pet);
            })
            .then(response => {
                expect(response.status).to.equal(200);
            });
    });

    it('should delete a pet', () => {
        // Delete the pet
        cy.request('DELETE', '/v2/pet/1500')
            .then(response => {
                expect(response.status).to.equal(200);
            });
    });
});
