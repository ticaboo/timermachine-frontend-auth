import styled from 'styled-components';
import { sharedText, sharedView } from './styles';

export const View = styled.div`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 20px;
`;
//props dont pass through to sharedText here.
//overriding here looses on sharability.
//maybe its better just to change the styled.htmlEquiv / nativeEquiv.
export const Text = styled.span`
  ${sharedText}
  background-color: ${(props) => props.bg}
`;

//props work here
export const Title = styled.header`
  background-color: ${(props) => props.bg};
`;

export const theme = {
  colors: {
    header: 'green',
    body: '#112233',
    footer: '#a456d4'
  }
};
