// e2e/home.spec.js

describe('Home Page', () => {
  it('should load and display the featured sneakers section', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Featured Sneakers').should('be.visible');
    cy.get('.grid').should('exist');
  });

  it('should show loading text or error if sneakers are not loaded', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Loading sneakers...').should('exist').or('contain', 'Error fetching sneakers');
  });

  it('should display the Navbar and Footer', () => {
    cy.visit('http://localhost:3000');
    cy.get('nav').should('exist');
    cy.get('footer').should('exist');
  });
}); 