import styled from 'styled-components';

export default styled.div`

  ${({isX}) => !isX ? '' : `
    &::after {
      content: 'x';
      width: 10px;
      height: 10px;
      position: absolute;
      left: 0;
      top: 0;
    }
  `};
`;
