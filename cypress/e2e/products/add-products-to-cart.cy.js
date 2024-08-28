describe('Produtos', function () {
  before(function () {
    cy.intercept(`${Cypress.env('BASE_URL_API')}product`)
      .as('getProducts')

    cy.visit(Cypress.env('BASE_URL_WEB'))
    
    cy.wait('@getProducts')
  })
  it('Adicionar produto ao carrinho com sucesso', function () {
    cy.get('.card-footer-item')
      .first()
      .click()

    cy.get('.swal2-popup')
      .as('successModal')
      .should('exist')
      .should('contain.text', 'Produto adicionado ao carrinho!')

    cy.clock()
    cy.tick(2000)

    cy.get('@successModal')
      .should('not.exist')
  })
})