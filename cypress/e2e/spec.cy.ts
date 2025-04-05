describe('Bank App E2E Tests', () => {
  it('should visit the homepage', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Open a bank account').should('be.visible');
  });

  it('should complete the happy path for creating an everyday account', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Open a bank account').click();
    cy.url().should('include', '/create-account');
    cy.contains('Open a Bank Account').should('be.visible');
    cy.get('input[name="nickname"]').type('My Account');
    cy.get('input[value="everyday"]').should('be.checked');

    // Submit the form
    cy.contains('Create Account').click();
    cy.url().should('eq', 'http://localhost:3000/?success=true');
    cy.contains('Your account was successfully created').should('be.visible');
  });

  it('should complete the happy path for creating a savings account', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Open a bank account').click();
    cy.url().should('include', '/create-account');
    cy.get('input[name="nickname"]').type('My Savings Account');
    cy.get('input[value="savings"]').click();
    cy.get('input[name="savingsGoal"]').should('be.visible');
    cy.get('input[name="savingsGoal"]').type('50000');

    // Submit the form
    cy.contains('Create Account').click();
    cy.url().should('eq', 'http://localhost:3000/?success=true');
    cy.contains('Your account was successfully created').should('be.visible');
  });
});
