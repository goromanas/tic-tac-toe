import React, { useContext } from 'react';
import styled from 'styled-components';

import DispatchContext from '../DispatchContext';

const StyledButton = styled.button`
  margin-top: 2rem;
  cursor: pointer;
`;

const Restart = () => {
  const appDispatch = useContext(DispatchContext);
  return <StyledButton onClick={() => appDispatch({ type: 'restart' })}>Restart</StyledButton>;
};

export default Restart;
