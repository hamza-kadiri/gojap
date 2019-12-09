/**
 *
 * Numbers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NumberCircle from 'components/NumberCircle';
import Grid from '@material-ui/core/Grid';
import { isMobile } from 'react-device-detect';

const StyledGrid = styled(Grid)`
  ${isMobile &&
    `
  flex-grow: 0;
  max-width: 20%;
  flex-basis: 20%;`}
`;

const Container = styled(Grid)`
  flex: 1;
`;
function Numbers({ handleSelect }) {
  return (
    <Container
      container
      justify="center"
      spacing={1}
      alignContent="flex-end"
      alignItems="center"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
        <StyledGrid item key={number}>
          <NumberCircle onClick={() => handleSelect(number)} number={number} />
        </StyledGrid>
      ))}
    </Container>
  );
}

Numbers.propTypes = {
  handleSelect: PropTypes.func,
};

export default Numbers;
