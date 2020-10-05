import React from 'react';
import styled from 'styled-components';

import Square from './Square';

const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
`;

const Board = ({ board }) => (
  <StyledBoard>
    {board.map((item, index) => (
      <Square value={item} index={index} key={index} />
    ))}
  </StyledBoard>
);

export default Board;
