describe('Login Page', () => {
  beforeEach(() => {
    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server();
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');

    cy.visit('/');
    cy.wait('@login');
  });

  it('Should open login pageNumber', () => {
    cy.get('.title').should('be.visible');
  });

  it('Should have a correct url', () => {
    cy.url().should('include', 'auth');
  });

  it('Should toggle password visibility', () => {
    cy.get('[data-cy=password]').as('password-box');
    cy.get('[data-cy=toggle-visibility-button]').as('visibility-toggle');
    cy.get('@password-box').invoke('attr', 'type').should('eq', 'password');
    cy.get('@visibility-toggle').click();
    cy.get('@password-box').invoke('attr', 'type').should('eq', 'text');
    cy.get('@visibility-toggle').click();
    cy.get('@password-box').invoke('attr', 'type').should('eq', 'password');
  });

  it('Should have a correct login info', () => {
    cy.get('[data-cy=login-info]')
      .get('h1')
      .should('have.text', 'QAD EQMS 2021.0 Development Environment');
  });

  it('Should get an error when username is not provided', () => {
    cy.get('[data-cy=username]').clear();
    cy.get('[data-cy=password').type('aimhi');
    const signInButton = cy.get('.sign-in-button');
    signInButton.click();
    cy.get('.mat-error').contains('We need an email address');
  });

  it('Should get an error when password is not provided', () => {
    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').clear();
    const signInButton = cy.get('.sign-in-button');
    signInButton.click();
    cy.get('.mat-error')
      .should('be.visible')
      .and('contain', 'We need a password');
  });

  it('Should have a correct title', () => {
    cy.title().should('include', 'Login');
  });

  it('Should be able to login when pressed Sign-in button', () => {
    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json',
    });
    cy.intercept('GET', '**/api/navigation*', {
      fixture: 'navigation.json',
    });
    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').type('aimhi');

    const signInButton = cy.get('.sign-in-button');
    signInButton.contains('SIGN IN');
    signInButton.click();
  });

  it('Should be able to login when pressed Enter', () => {
    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json',
    });
    cy.intercept('GET', '**/api/navigation*', {
      fixture: 'navigation.json',
    });
    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').type('aimhi{enter}');
  });
});
