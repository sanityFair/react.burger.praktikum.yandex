describe('Burger Constructor Functionality', () => {
  const ingredient = '[data-testid="Соус Spicy-X"]';
  const constructorArea = '[data-testid="constructor-area"]';
  const closeButton = '[data-testid="modal-close-button"]';

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should drag and drop ingredients to constructor', () => {
    cy.get(ingredient).trigger('dragstart');
    cy.get(constructorArea).trigger('drop');

    cy.get(constructorArea).should('contain', 'Соус Spicy-X');
  });

  it('should create an order successfully', () => {
    cy.createOrder();
    cy.get('[data-testid="modal"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });

  it('should close modal window', () => {
    cy.createOrder();
    cy.get(closeButton).click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
