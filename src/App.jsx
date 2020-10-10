/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { useImmerReducer } from 'use-immer';

import Board from './components/Board';
import DispatchContext from './DispatchContext';
import StateContext from './StateContext';
import Restart from './components/Restart';
import ActionLog from './components/ActionLog';
import Result from './components/Result';
import Error from './components/Error';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function App() {
  const initialState = {
    board: Array(9).fill(null),
    firstPlayerTurn: true,
    gameEnded: false,
    loading: false,
    actions: [],
    winner: '',
    error: false,
  };

  let icon;

  async function clearActionLog() {
    await Axios.delete('http://localhost:8080/action');
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
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function gameReducer(draft, action) {
    switch (action.type) {
      case 'click':
        icon = draft.firstPlayerTurn ? 'X' : 'O';
        if (draft.board[action.square] || draft.gameEnded) return;
        draft.board[action.square] = icon;
        draft.firstPlayerTurn = !draft.firstPlayerTurn;
        draft.actions.push({ block: action.square, player: icon });
        return;
      case 'restart':
        clearActionLog();
        return initialState;
      case 'gameEnd':
        draft.gameEnded = true;
        draft.winner = action.winner;
        return;
      case 'loadData':
        action.data.forEach((square) => {
          draft.board[square.block] = square.player;
          draft.actions.push({ block: square.block, player: square.player });
        });
        return;
      case 'setLoading':
        draft.loading = action.value;
        break;
      case 'setError':
        draft.error = true;
        break;

      default:
    }
  }

  const [state, dispatch] = useImmerReducer(gameReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setLoading', value: true });
    async function getData() {
      try {
        const response = await Axios.get('http://localhost:8080/action');
        dispatch({ type: 'loadData', data: response.data });
        dispatch({ type: 'setLoading', value: false });
      } catch (error) {
        dispatch({ type: 'setError' });
      }
    }
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (calculateWinner(state.board)) dispatch({ type: 'gameEnd', winner: calculateWinner(state.board) });
    if (!state.board.includes(null) && !calculateWinner(state.board)) dispatch({ type: 'gameEnd', winner: 'draw' });
  }, [state.board, dispatch]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {state.error ? <Error /> : (
          <StyledApp>
            {state.winner ? <Result winner={state.winner} /> : ''}
            {state.loading ? 'Loading' : ''}
            <Board board={state.board} calculateWinner={calculateWinner} />
            <Restart />
            <ActionLog actions={state.actions} />
          </StyledApp>
        )}

      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
