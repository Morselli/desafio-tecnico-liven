describe('Produtos', function() {
  before(function() {
    cy.intercept(`${Cypress.env('BASE_URL_API')}product`)
      .as('getProducts')

    cy.visit(Cypress.env('BASE_URL_WEB'))

    cy.wait('@getProducts')
  })
  it('Visualizar listagem de produtos com sucesso', function() {
    cy.get('.card')
      .should('exist')
      .should('have.length', 8)
  })
})