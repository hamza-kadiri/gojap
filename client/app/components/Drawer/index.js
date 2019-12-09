/**
 *
 * Drawer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const Wrapper = styled.div`
  width: 300px;
`;

function Drawer({ toggleDrawer, open, component }) {
  const Content = component;
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <Wrapper>
        <Content />
      </Wrapper>
    </SwipeableDrawer>
  );
}

Drawer.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
};

export default Drawer;
