describe('Carrinho', function() {
  before(function () {
    cy.intercept(`${Cypress.env('BASE_URL_API')}product`)
      .as('getProducts')

    cy.visit(Cypress.env('BASE_URL_WEB'))

    cy.wait('@getProducts')

    cy.get('.card-footer-item')
      .first()
      .click()

    cy.get('.navbar-burger')
      .click()

    cy.get('a[href="/cart"]')
      .click()
  })

  it('Botão "Fechar pedido" deve exibir modal de funcionalidade não implementada, com sucesso', function() {
    cy.get('button')
      .contains('Fechar pedido')
      .click()

      cy.get('.swal2-popup')
        .should('exist')
        .should('include.text', 'Funcionalidade não implementada!')
  })
})