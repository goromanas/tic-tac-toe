import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledResult = styled.div`
  display: flex;
`;

const Winner = styled.p`
  font-weight: bold;
  color: #3C4020;
`;

const Result = ({ winner }) => (
  <StyledResult>
    Winner:
    <Winner>{winner}</Winner>
  </StyledResult>
);

Result.propTypes = {
  winner: PropTypes.string.isRequired,
};

export default Result;
