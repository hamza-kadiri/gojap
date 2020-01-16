/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import IconButton from '@material-ui/core/IconButton';

import { useInjectReducer } from 'utils/injectReducer';
import HomePageHeader from 'components/HomePageHeader';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TitleHeader from 'components/TitleHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import makeSelectHeader, {
  makeSelectCurrentKey,
  makeSelectTitle,
  makeSelectMoreMenu,
  makeSelectSubTitle,
} from './selectors';

import reducer from './reducer';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledIconButton = styled(IconButton)`
  color: ${props => props.theme.palette.common.white};
`;

const getSpecificHeader = () => ({
  '': <HomePageHeader />,
});

const defaultHeader = (title, subtitle) => (
  <TitleHeader title={title} subtitle={subtitle} />
);

export function Header({ dispatch, title, subtitle, moreMenu }) {
  useInjectReducer({ key: 'header', reducer });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOrders = onClick => {
    handleClose();
    onClick.call();
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        {getSpecificHeader()[title] || defaultHeader(title, subtitle)}
        {moreMenu.length > 0 && (
          <React.Fragment>
            <StyledIconButton aria-label="Back" onClick={handleClick}>
              <MoreVertIcon />
            </StyledIconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {moreMenu.map(item => (
                <MenuItem
                  key={item.name}
                  onClick={() => handleClickOrders(item.onClick)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </StyledToolbar>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dispatch: PropTypes.func,
  moreMenu: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  currentKey: makeSelectCurrentKey(),
  title: makeSelectTitle(),
  subtitle: makeSelectSubTitle(),
  moreMenu: makeSelectMoreMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Header);
