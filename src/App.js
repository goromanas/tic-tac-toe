import React from 'react';
import styled from 'styled-components';
import { useImmerReducer } from 'use-immer';

import Board from '../src/components/Board';
import DispatchContext from '../src/DispatchContext';

const StyledApp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function App() {
  const initialState = {
    board: Array(9).fill(null),
    firstPlayerTurn: true
  };

  function gameReducer(draft, action) {
    switch (action.type) {
      case 'click':
        const icon = draft.firstPlayerTurn ? 'X' : 'O';
        if (draft.board[action.square] || calculateWinner(draft.board)) return;
        draft.board[action.square] = icon;
        draft.firstPlayerTurn = !draft.firstPlayerTurn;
        return;
      default:
        break;
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const [state, dispatch] = useImmerReducer(gameReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StyledApp>
        <Board board={state.board} />
      </StyledApp>
    </DispatchContext.Provider>
  );
}

export default App;
