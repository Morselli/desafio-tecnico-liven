describe('Produtos', function () {
  beforeEach(function () {
    cy.intercept(`${Cypress.env('BASE_URL_API')}product`)
      .as('getProducts')

    cy.visit(Cypress.env('BASE_URL_WEB'))
    
    cy.wait('@getProducts')
  })
  it('Avançar paginação na listagem de Produtos com sucesso', function () {
    cy.get('a.pagination-link')
      .contains('2')
      .as('pageTwoLink')
      .click()

    cy.get('@pageTwoLink').should('have.class', 'is-current')

    cy.get('.card')
      .should('exist')
      .should('have.length', 8)
  })

  it('Voltar paginação na listagem de Produtos com sucesso', function () {
    cy.get('a.pagination-link')
      .contains('2')
      .as('pageTwoLink')
      .click()

    cy.get('@pageTwoLink').should('have.class', 'is-current')

    cy.get('.card')
      .should('exist')
      .should('have.length', 8)

    cy.get('a.pagination-link')
      .contains('1')
      .as('pageOneLink')
      .click()

    cy.get('@pageOneLink').should('have.class', 'is-current')

    cy.get('.card')
      .should('exist')
      .should('have.length', 8)
  })
})