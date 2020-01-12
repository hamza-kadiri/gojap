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
import { toggleRecap } from 'containers/OrderScreen/actions';
import makeSelectHeader, {
  makeSelectCurrentKey,
  makeSelectTitle,
  makeSelectMoreMenu,
} from './selectors';

import reducer from './reducer';

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const StyledIconButton = styled(IconButton)`
  color: ${props => props.theme.palette.common.white};
`;

const getSpecificHeader = title => ({
  '': <HomePageHeader />,
});

const defaultHeader = title => <TitleHeader title={title} />;

export function Header({ dispatch, title, moreMenu }) {
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
        {getSpecificHeader(title)[title] || defaultHeader(title)}
        <StyledIconButton aria-label="Back" onClick={handleClick}>
          <MoreVertIcon />
        </StyledIconButton>
        {moreMenu.length > 0 && (
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
        )}
      </StyledToolbar>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  dispatch: PropTypes.func,
  moreMenu: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  currentKey: makeSelectCurrentKey(),
  title: makeSelectTitle(),
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
