/**
 *
 * IconButton
 *
 */

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';

export default styled(({ ...rest }) => <IconButton {...rest} />)`
  margin-right: ${props => {
    return props.theme.spacing(2);
  }};
`;
