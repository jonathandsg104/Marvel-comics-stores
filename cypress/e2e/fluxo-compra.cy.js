// Teste E2E básico: fluxo de compra
// - Acessa a home
// - Adiciona uma HQ ao carrinho
// - Verifica se aparece no carrinho
// - Altera quantidade
// - Aplica cupom

describe('Fluxo de compra Marvel HQ', () => {
  it('Adiciona HQ ao carrinho e aplica cupom', () => {
    // Acessa a home
    cy.visit('/');
    // Adiciona a primeira HQ ao carrinho
    cy.get('button').contains('Adicionar ao Carrinho').first().click();
    // Verifica se aparece no carrinho
    cy.get('div').contains('Carrinho');
    cy.get('li').should('contain.text', 'HQ Marvel #1');
    // Altera quantidade
    cy.get('input[type="number"]').clear().type('2');
    // Aplica cupom comum
    cy.get('input[placeholder="Cupom de desconto"]').type('DESCONTO10');
    cy.get('button').contains('Aplicar').click();
    // Verifica desconto
    cy.get('div').should('contain.text', 'Cupom aplicado: DESCONTO10');
    cy.get('div').should('contain.text', 'Desconto:');
  });
});
