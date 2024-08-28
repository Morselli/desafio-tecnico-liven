describe('Carrinho', function () {
  beforeEach(function () {
    cy.intercept(`${Cypress.env('BASE_URL_API')}product`)
      .as('getProducts')

    cy.visit(Cypress.env('BASE_URL_WEB'))

    cy.wait('@getProducts')
  })

  it('Visualizar carrinho vazio com sucesso', function () {
    cy.get('.navbar-burger')
      .click()

    cy.get('a[href="/cart"]')
      .click()

    cy.get('div.notification')
      .should('exist')
      .should('have.text', 'Sem produtos no carrinho :(')
  })

  it('Visualizar carrinho com produtos com sucesso', function () {
    cy.get('.card-footer-item')
      .first()
      .click()

    cy.get('.navbar-burger')
      .click()

    cy.get('a[href="/cart"]')
      .click()

    cy.get('div.notification')
      .should('not.exist')

    cy.get('li.cart-product-item')
      .should('exist')
  })

  it('Voltar para a tela de Produtos pelo botão existente no carrinho vazio com sucesso', function () {
    cy.get('.navbar-burger')
      .click()

    cy.get('a[href="/cart"]')
      .click()

    cy.get('div.notification')
      .should('exist')
      .should('have.text', 'Sem produtos no carrinho :(')

    cy.get('div.box>a[href="/"]')
      .should('exist')
      .click()

    cy.get('.card')
      .should('exist')
      .should('have.length', 8)
  })
})