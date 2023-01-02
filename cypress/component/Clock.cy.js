import { Clock } from '../../src/chronic/subcomponents/CounterClock';
import { tagids } from '../../src/common/tags'; //'../../../src/common/tags';

describe('Clock.cy.js', () => {
  it('shows the time', () => {
    const params = { seconds: 10 };
    cy.mount(<Clock {...params} />);
    cy.get(tagids['counterclockseconds']).should('have.text', '10');
    //expect clock display to show 10
  });
});
