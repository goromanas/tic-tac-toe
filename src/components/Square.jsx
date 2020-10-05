import React, { useContext } from 'react';
import styled from 'styled-components';
import DispatchContext from '../DispatchContext';

const StyledSquare = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;

  &:hover {
    background-color: #e5e5e5;
    transition: all 0.2s ease-out;
  }
`;

const Square = ({ value, index }) => {
  const appDispatch = useContext(DispatchContext);

  return <StyledSquare onClick={handleClick}>{value}</StyledSquare>;

  function handleClick() {
    appDispatch({ type: 'click', square: index });
  }
};

export default Square;
