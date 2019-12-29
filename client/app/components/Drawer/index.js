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

function Drawer({ toggleDrawer, open, component, onClickItem }) {
  const Content = component;
  return (
    <SwipeableDrawer
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <Wrapper>
        <Content
          onClickItem={item => {
            toggleDrawer(false);
            return onClickItem(item);
          }}
        />
      </Wrapper>
    </SwipeableDrawer>
  );
}

Drawer.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
  component: PropTypes.object,
  onClickItem: PropTypes.func,
};

export default Drawer;
