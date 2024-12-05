Cypress.Commands.add('createOrder', () => {
  const bun = '[data-testid="Краторная булка N-200i"]';
  const ingredient = '[data-testid="Соус Spicy-X"]';
  const constructorArea = '[data-testid="constructor-area"]';
  const orderButton = '[data-testid="order-button"]';

  cy.get(bun).trigger('dragstart');
  cy.get(constructorArea).trigger('drop');

  cy.get(ingredient).trigger('dragstart');
  cy.get(constructorArea).trigger('drop');

  cy.get(orderButton).click();
});
