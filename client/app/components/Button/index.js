/**
 *
 * Button
 *
 */

import React, { Children } from 'react';
import StyledButton from './StyledButton';
// import PropTypes from 'prop-types';

function Button(props) {
  return <StyledButton>{Children.toArray(props.children)}</StyledButton>;
}

Button.propTypes = {};

export default Button;
