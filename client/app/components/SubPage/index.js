/**
 *
 * Menu
 *
 */

import React from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const StyledBox = styled(({ ...rest }) => <Box {...rest} />)`
  height: 100%;
  margin: 0 10px;
  .AutoSizerWrapper-t619rn-0.dwWydR {
    height: 100%;
  }
`;

function SubPage(props) {
  const { children, value, index, ...other } = props;

  return (
      <StyledBox
        hidden={index !== value}>
          {children}
      </StyledBox>
  );
}

SubPage.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default SubPage;
