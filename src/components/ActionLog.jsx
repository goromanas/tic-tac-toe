/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledActionLog = styled.div`
  height: 200px;
  margin-top: 2rem;
`;
const ActionLog = ({ actions }) => (
  <StyledActionLog>
    <h2>Action log</h2>
    <ol>
      {actions.map((action, index) => (
        <li key={index}>
          Player
          {' '}
          {action.player}
          {' '}
          selected
          {' '}
          {action.block}
          {' '}
          block.
        </li>
      ))}
    </ol>
  </StyledActionLog>
);

ActionLog.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    player: PropTypes.string,
    block: PropTypes.number,
  })).isRequired,
};

export default ActionLog;
