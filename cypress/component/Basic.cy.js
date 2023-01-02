import Basic from '../../src/chronic/subcomponents/Basic';
import { tagids } from '../../src/common/tags'; //'../../../src/common/tags';

describe('Basic.cy.js', () => {
  it('it...', () => {
    cy.mount(<Basic>children</Basic>);
    cy.get('[data-test-basic-children]').should('have.text', 'children');
    //expect clock display to show 10
  });
});
