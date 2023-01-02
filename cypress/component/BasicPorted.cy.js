import BasicPorted from '../../src/chronic/subcomponents/BasicPorted';
import { tagids } from '../../src/common/tags'; //'../../../src/common/tags';

describe('Basic.cy.js', () => {
  it('it...', () => {
    cy.mount(<BasicPorted>children</BasicPorted>);
    cy.get('[data-test-basic-children]').should('have.text', 'children');
    //expect clock display to show 10
  });
});
