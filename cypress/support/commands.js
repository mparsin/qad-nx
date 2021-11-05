// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('skipLogin', () => {
  localStorage.setItem(
    'auth_data',
    JSON.stringify({
      access_token: 'eyJ',
      token_type: 'bearer',
      expires_in: 86399,
      accountId: '102',
      personId: '151',
      isAdmin: 'false',
      readOnly: 'false',
      fullName: 'Igor Sigal',
      businessUnit: '',
      businessUnitId: '0',
      emailAddress: 'i6s@qad.com',
      firstName: 'Igor',
      lastName: 'Sigal',
      locale: 'en-US',
      clientIP: '::1',
      browserInfoName: 'Chrome88',
      roles: '[]',
      sessionTimeout: '0',
      sessionTimeoutAction: 'None',
      session_id: 'b24a3506-ed3d-4727-9840-bee7a5421b8c',
      skinName: 'sknDefault',
      timeZone: '',
    })
  );
});
