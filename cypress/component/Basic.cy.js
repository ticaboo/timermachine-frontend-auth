import Basic from '../../src/chronic/subcomponents/Basic';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/chronic/subcomponents/sharedStyles';
//import { tagids } from '../../src/common/tags'; //'../../../src/common/tags';

describe('Basic.cy.js', () => {
  it('it...', () => {
    cy.mount(
      <ThemeProvider theme={theme}>
        <Basic>children</Basic>
      </ThemeProvider>
    );
    cy.get('[data-test-basic-children]').should('have.text', 'children');
    //expect clock display to show 10
  });
});
