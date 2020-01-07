/**
 *
 * Button
 *
 */

import React, { Children } from 'react';
import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';

function StyledButton(props) {
  return <Button style={{"margin": "40px"}} variant="outlined" color="primary" {...props}>{Children.toArray(props.children)}</Button>;
}

StyledButton.propTypes = {};

export default StyledButton;
