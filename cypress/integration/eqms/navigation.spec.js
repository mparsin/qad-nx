describe('Navigation Sidebar', () => {
  beforeEach(() => {
    cy.skipLogin();
    cy.intercept('GET', '**/api/navigation*', {
      fixture: 'navigation.json',
    });
    cy.visit('/');
  });

  it('Should open app without login', () => {
    cy.get('[data-cy=nav-dropdown]').its('length').should('eq', 20);
  });

  it('Should filter navigation correctly', () => {
    cy.visit('/');
    cy.get('[data-cy=filter-box]').type('proj', { delay: 100 });
    cy.get('[data-cy=nav-dropdown]').its('length').should('eq', 6);
    cy.get('[data-cy=nav-link]').its('length').should('eq', 17);
  });

  it.only('Should navigate to correct URL', () => {
    cy.get('[data-cy=nav-dropdown]').eq(2).as('apqp-group');
    cy.get('@apqp-group').click();
    cy.get('[data-cy=nav-link] > [data-cy="process/NewProductDevelopment_p"]')
      .first()
      .click();
    cy.url().should('include', 'process/NewProductDevelopment_p');
  });
});
