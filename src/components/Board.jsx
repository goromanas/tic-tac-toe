import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import styled from 'styled-components';

import Square from './Square';

const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
`;

const Board = ({ board, calculateWinner }) => (
  <StyledBoard>
    {board.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Square value={item} index={index} key={index} calculateWinner={calculateWinner} />
    ))}
  </StyledBoard>
);

Board.propTypes = {
  board: arrayOf(PropTypes.string).isRequired,
  calculateWinner: PropTypes.func.isRequired,
};

export default Board;
