describe('eqms-auth-feature', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));
  it('should render the component', () => {
    cy.get('qad-login').should('exist');
  });
});