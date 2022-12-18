import { testTimers, setLocalStorageTimers } from '../../support/utils';
import { tagids } from '../../../src/common/tags';

/*
TODO: using singletimer on index.html, should create one from test.
(tests coupled to index.html not ideal)
*/

describe('singleTimer', () => {
  beforeEach(() => {
    // setLocalStorageTimers(null);
    //setLocalStorageTimers(testTimers.basics); //may use to check not interfered with.
    //console.log('getLocalStorageTimers', getLocalStorageTimers());
    cy.visit('/');
  });
  it('loads timer from html props', () => {});
});
