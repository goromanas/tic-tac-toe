import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error = () => (
  <StyledError>We are sorry, there was an error.</StyledError>
);

export default Error;
