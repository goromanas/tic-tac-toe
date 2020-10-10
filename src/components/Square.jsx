import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Axios from 'axios';

import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

const StyledSquare = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid #000;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
  const appState = useContext(StateContext);

  function handleClick() {
    if (appState.gameEnded || appState.board[index] !== null) return;
    const postRequest = Axios.CancelToken.source();
    async function fetchResults() {
      try {
        await appDispatch({ type: 'click', square: index });
        await Axios.post('http://localhost:8080/action', { block: index, player: appState.firstPlayerTurn ? 'X' : 'O' });
      } catch (e) {
        appDispatch({ type: 'setError' });
      }
    }
    fetchResults();
    // eslint-disable-next-line consistent-return
    return () => postRequest.cancel();
  }

  return (
    <StyledSquare disabled={false} onClick={handleClick}>
      {value}
    </StyledSquare>
  );
};

Square.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number,
};

Square.defaultProps = {
  value: '',
  index: 0,
};

export default Square;
