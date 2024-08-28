describe('Carrinho', function () {
  beforeEach(function () {
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

  it('Aumentar quantidade de um produto no carrinho com sucesso', function () {
    cy.get('div.media-content>div>p')
      .as('productQuantity')
      .should('include.text', 'x 1')

    cy.get('svg[data-icon="plus"]')
      .click()

    cy.get('@productQuantity')
      .should('include.text', 'x 2')
  })

  it('Diminuir quantidade de um produto no carrinho com sucesso', function () {
    cy.get('div.media-content>div>p')
      .as('productQuantity')
      .should('include.text', 'x 1')

    cy.get('svg[data-icon="plus"]')
      .click()

    cy.get('@productQuantity')
      .should('include.text', 'x 2')

    cy.get('svg[data-icon="minus"]')
      .click()

    cy.get('@productQuantity')
      .should('include.text', 'x 1')
  })
})