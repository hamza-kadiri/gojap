import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Wrapper from './Wrapper';

const LoadingIndicator = ({ size }) => (
  <Wrapper>
    <CircularProgress size={size || 40} />
  </Wrapper>
);

export default LoadingIndicator;
