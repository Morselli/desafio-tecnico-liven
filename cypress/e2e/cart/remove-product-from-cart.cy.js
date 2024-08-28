describe('Carrinho', function () {
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

  it('Remover produto do carrinho com sucesso', function () {
    cy.get('div.media-content>div>p')
      .as('productQuantity')
      .should('include.text', 'x 1')

    cy.get('svg[data-icon="minus"]')
      .click()

    cy.get('div.notification')
      .should('exist')
      .should('have.text', 'Sem produtos no carrinho :(')
  })
})