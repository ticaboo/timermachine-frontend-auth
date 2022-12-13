import { testTimers, setLocalStorageTimers } from '../../support/utils';
import { tagids } from '../../../src/common/tags';
console.log('tagids', tagids);

describe('to lib button', () => {
  beforeEach(() => {
    // setLocalStorageTimers(null);
    setLocalStorageTimers(testTimers.empty);
    //console.log('getLocalStorageTimers', getLocalStorageTimers());
    cy.visit('/');

    //interesting error:
    // cy.get(d.t`chronos-container`).each(($el) => {
    //   cy.get($el).within(() => {
    //     cy.get(tagids.removebutton).click();
    //   });
    // });
  });
  it('page has first tolibbutton', () => {
    cy.get(tagids.tolibbutton).should('exist');

    cy.get(tagids.tolibbutton).first().as('firsttolibbutton');

    cy.get('@firsttolibbutton')
      .click()
      .then(() => {
        // cy.get(tagids['timer-input-name']).last().as('lastTimer');
        // console.log(cy.get('@lastTimer'));
        // .invoke('val')
        // .then((val) => {
        //   console.log('val', val);
        //   expect(val).tobe('Meditation');
        // });
      });
    cy.wait(100);
    cy.get(tagids['timer-input-name'], { timeout: 2000 })
      //.eq(1)
      .first()
      .should('have.value', 'Meditation');
  });
});
