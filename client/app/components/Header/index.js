import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import GoJap from 'images/gojap.png';
import history from 'utils/history';
import IconButton from '../IconButton';
import NavBar from './NavBar';
import Img from './Img';

const Logo = styled.div`
  flex-grow: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTypography = styled(Typography)`
  margin-left: 1rem;
`;

function Header({ handleOpenDrawer }) {
  return (
    <NavBar>
      <AppBar position="static">
        <Toolbar>
          {handleOpenDrawer() != null && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenDrawer()}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Logo onClick={() => history.push('/')}>
            <Img src={GoJap} alt="gojap-logo" />
            <StyledTypography variant="h6">Go Jap !</StyledTypography>
          </Logo>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </NavBar>
  );
}

export default Header;
