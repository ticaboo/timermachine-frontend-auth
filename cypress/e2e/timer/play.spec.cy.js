//setup

describe('basic timer plays', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('passes', () => {
    //get play button within first , click it

    cy.get('[data-test-chronos-container]').first().as('chronos');

    cy.get('@chronos')
      .get('[data-test-playbutton]')
      .first()
      .click()
      .then(() => {
        cy.get('[data-test-playervisible="true"]').should('exist');
      });
    // expect(cy.get('[data-test-playervisible="true"]').first()).to.equal(true);

    //cy.get('[data-test-playervisible]').first().should('be.true');

    // cy.get('[data-test-chronos-container]')
    //   .first()
    //   .within(($el) => {
    //     cy.get('[data-test-playbutton]').should('exist');
    //     cy.get('[data-test-playbutton]').click();
    //     console.log($el);
    //     //$el.attr('[data-test-playervisible]').should('exist');
    //   });

    //get playerVisible
  });
});

//teardown
