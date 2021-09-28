describe('shared-ui-messages', () => {
  beforeEach(() => cy.visit('/iframe.html?id=loaderrorcomponent--primary&args=message;'));
  it('should render the component', () => {
    cy.get('qad-load-error').should('exist');
  });
});