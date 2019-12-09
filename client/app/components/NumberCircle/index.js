/**
 *
 * NumberCircle
 *
 */

import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const StyledAvatar = styled(Avatar)`
  background-color: ${props => props.theme.palette.primary.main};
`;
function NumberCircle({ number, onClick }) {
  return (
    <Fab onClick={onClick} color="primary">
      <StyledAvatar color="primary">{number}</StyledAvatar>
    </Fab>
  );
}

NumberCircle.propTypes = {
  number: PropTypes.number,
  onClick: PropTypes.func,
};

export default NumberCircle;
