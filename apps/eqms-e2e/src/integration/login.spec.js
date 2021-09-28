/// <reference types="cypress" />

describe('Login Page', () => {
  it('Should open login page', () => {
    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server();
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');
    cy.visit('/');
    cy.contains('Sign in to QAD EQMS');
  });

  it('Should display login info', () => {
    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server();
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');
    cy.visit('/');

    cy.wait('@login');

    cy.get('markdown').contains('QAD EQMS');
  });

  it('Should get an error when username is not provided', () => {
    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server();
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');
    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json'
    });
    cy.visit('/');

    cy.get('[data-cy=username]').clear();
    cy.get('[data-cy=password').type('aimhi');

    const signInButton = cy.get('.sign-in-button');
    signInButton.click();
    cy.get('.mat-error').contains('We need an email address');
  });

  it('Should get an error when password is not provided', () => {
    cy.server();
    cy.route('**/api/environmentInfo/loginInfo?convertToHtml=false', '').as(
      'login'
    );

    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json'
    });
    cy.visit('/');

    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').clear();
    const signInButton = cy.get('.sign-in-button');
    signInButton.click();
    cy.get('.mat-error').contains('We need a password');
  });

  it('Should be able to login', () => {
    cy.intercept('**/api/environmentInfo/loginInfo?convertToHtml=false', {
      fixture: 'loginInfo.txt'
    });

    cy.intercept('GET', '**/api/navigation*', {
      fixture: 'navigation.json'
    });

    cy.intercept('GET', '**/api/actionList/groups/*', {
      fixture: 'actions.json'
    });

    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json'
    });

    cy.intercept('PUT', '**/api/dashboard', {
      fixture: 'dashboards.json'
    }).as('getDashboards');

    cy.visit('/');

    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').type('aimhi');

    const signInButton = cy.get('.sign-in-button');
    signInButton.contains('SIGN IN');
    signInButton.click();
    //
    // cy.visit('/');
    // cy.wait('@getDashboards');

    // cy.get('h2').contains('Igor');
  });

  it.skip('Should open login dialog when user tries to navigate to protected route', () => {
    cy.visit('dashboards/processes');
    cy.url().should('include', '/auth/login');
  });

  it.skip('Should clear auth data from local storage on logout', () => {
    const key = 'auth_data';
    localStorage.setItem(key, 'some value');
    cy.visit('/auth/login').then((r) => {
      expect(localStorage.getItem(key)).to.be.null;
    });
  });

  it.skip('Should redirect to the requested route after completing authorization', () => {
    const origUrl = 'dashboards/processes';

    cy.intercept('**/api/environmentInfo/loginInfo?convertToHtml=false', {
      fixture: 'loginInfo.txt'
    });

    cy.intercept('POST', '**/api/token', {
      fixture: 'token.json'
    });

    cy.intercept('PUT', '**/api/dashboard', {
      fixture: 'dashboards.json'
    }).as('getDashboards');

    cy.intercept('GET', '**/api/navigation*', {
      fixture: 'navigation.json'
    });

    cy.intercept('GET', '**/api/actionList/groups/*', {
      fixture: 'actions.json'
    });

    cy.visit(origUrl);

    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').type('aimhi');

    const signInButton = cy.get('.sign-in-button');
    signInButton.click();

    cy.url().should('include', origUrl);
  });

  it.only('Should hide password by default', () => {
    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server()
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');
    cy.visit('');
    cy.get('[data-cy=password').type('password');
    cy.get('[data-cy=password').should('have.text', '');
  });

  it.only('Should reveal password when toggle button pressed', () => {

    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server()
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');

    cy.visit('');

    cy.get('[data-cy=toggle-visibility-button').click();
    cy.get('[data-cy=password').type('password');
    cy.get('[data-cy=password').should('have.value', 'password');
  });

  it.only('Should send a correct payload to the login endpoint', () => {

    cy.fixture('LoginInfo.txt').as('LoginInfo');
    cy.server()
    cy.route(
      '**/api/environmentInfo/loginInfo?convertToHtml=false',
      '@LoginInfo'
    ).as('login');
    const origUrl = '';
    cy.visit(origUrl);
    cy.get('[data-cy=username]').type('igor');
    cy.get('[data-cy=password').type('aimhi');

    cy.server();
    cy.route('POST', '**/api/token').as('token');

    const signInButton = cy.get('.sign-in-button');
    signInButton.click();

    cy.wait('@token');

    cy.get('@token').then((xhr) => {
      console.log(xhr);
      expect(xhr.status).to.equal(200);
      expect(xhr.request.body).to.contain('username=igor');
      expect(xhr.request.body).to.contain('password=aimhi');
      expect(xhr.response.body.fullName).to.equal('Igor Sigal');
    });
  });
});
