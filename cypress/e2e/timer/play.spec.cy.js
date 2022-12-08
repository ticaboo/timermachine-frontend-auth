import {
  testTimers,
  setLocalStorageTimers,
  getLocalStorageTimers
} from '../../support/utils';
import { tagids } from '../../../src/common/tags';
console.log('tagids', tagids);

/*
setup:
  visit /
  delete any timers
  add from config
  ensure count as expected
*/
const d = {
  t: (dataTestIdentifier) => {
    return `[data-test-${dataTestIdentifier}]`;
  }
};

//alert(JSON.stringify(tagids));
describe('timer playing', () => {
  beforeEach(() => {
    // setLocalStorageTimers(null);
    setLocalStorageTimers(testTimers.basics);
    //console.log('getLocalStorageTimers', getLocalStorageTimers());
    cy.visit('/');
    // cy.get(tagids.removebutton, { multiple: true }).each(($el) => {
    //   alert(JSON.stringify($el));
    //   cy($el).click();
    // });

    //cy.task("db:seed");

    //possilby revisit:
    //cy.visit('/');

    // unnecessarily complex, hard to get working!: prob should do in selection.
    // eg data-test-chronos-container > data-test-removebutton'
    // cy.get(d.t`chronos-container`).each(($el, i) => {
    //   //blat el from dom or
    //   //clk delete
    //   console.log($el);
    //   cy.get($el)
    //     .get(d.t`removebutton`)
    //     .click();
    // });
  });
  it('basic timer, plays', () => {
    //seed:

    //get play button within first , click it

    //cy.get(d.t`addnewtimerbutton`).click();

    cy.get(d.t`chronos-container`)
      .first()
      .as('chronos');

    cy.get('@chronos')
      .get(d.t`playbutton`)
      .first()
      .click()
      .then(() => {
        //cy.get('[data-test-playervisible]').should('exist');
        cy.get(tagids.playervisible).should('exist');
        //cy.get('[data-test-playervisible="true"]').should('exist');
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
