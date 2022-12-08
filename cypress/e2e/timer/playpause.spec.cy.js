import { testTimers, setLocalStorageTimers } from '../../support/utils';
import { tagids } from '../../../src/common/tags';
console.log('tagids', tagids);

const d = {
  t: (dataTestIdentifier) => {
    return `[data-test-${dataTestIdentifier}]`;
  }
};

describe('timer playing', () => {
  beforeEach(() => {
    // setLocalStorageTimers(null);
    setLocalStorageTimers(testTimers.basics);
    //console.log('getLocalStorageTimers', getLocalStorageTimers());
    cy.visit('/');
  });
  it('plays then pauses then replays', () => {
    cy.get(d.t`chronos-container`)
      .first()
      .as('firstchronos');

    cy.get('@firstchronos')
      .get(tagids.playbutton)
      .first()
      .click()
      .then(() => {
        cy.get(tagids.playervisible).should('exist');

        cy.get('@firstchronos').within(() => {
          cy.get(tagids.counterclock).should('exist');
          cy.get(tagids.counteroverclock).should('not.exist');
          cy.get(tagids.pausebutton)
            .should('exist')
            .click()
            .then(() => {
              cy.get(tagids.replaybutton).should('exist');
              cy.get(tagids.editbutton).should('exist');
              cy.get(tagids.playbutton)
                .should('exist')
                .click()
                .then(() => {
                  cy.get(tagids.pausebutton).should('exist');
                  cy.get(tagids.counterclock).should('exist');
                  cy.get(tagids.counteroverclock).should('not.exist');
                })
                .then(() => {
                  // cy.wait(3000).then(() => {
                  cy.get(tagids.counteroverclock, { timeout: 2500 }).should(
                    'exist'
                  );
                  cy.get(tagids.endaudioisplaying, { timeout: 2500 }).should(
                    'exist'
                  );
                  cy.get(tagids.isannouncing, { timeout: 2500 }).should(
                    'exist'
                  );
                });
            });
        });
      });
  });
});
