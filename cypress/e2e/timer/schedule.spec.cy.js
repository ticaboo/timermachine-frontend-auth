import { testTimers, setLocalStorageTimers } from '../../support/utils';
import { tagids } from '../../../src/common/tags';
import { waitFor } from '@testing-library/react';
console.log('tagids', tagids);
/*
activate when 
  minute, set of minutes (eg * / 5) from db.
    further: active when edited.
  hour 
  day of week
  weeks of months
  month of year
  concurrent

*/

describe('schedules', () => {
  beforeEach(() => {
    // setLocalStorageTimers(null);
    setLocalStorageTimers(testTimers.schedules);
    cy.clock();
    // const ny = new Date('2030-01-01T00:00:59');
    // cy.clock().then((clock) => {
    //   clock.setSystemTime(ny);
    // });

    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);

    cy.visit('/');
  });
  //it('has schedule', () => {});
  it('triggers play at expected time', () => {
    cy.tick(1000);
    cy.tick(1000);
    cy.tick(1000);
    cy.tick(1000);
    cy.tick(1000);

    // cy.clock().then((clock) => {
    //   clock.setSystemTime(ny);
    //   clock.tick(1000);
    // });
  });
});
