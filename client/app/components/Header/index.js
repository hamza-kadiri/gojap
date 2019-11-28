import React from 'react';
import styled from 'styled-components';
import Img from './Img';
import NavBar from './NavBar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '../IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const StyledTypography = styled(Typography)`
  flex-grow: 1;
  text-align: center;
`;

function Header() {
  return (
    <NavBar>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <StyledTypography variant="h6">Go Jap !</StyledTypography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </NavBar>
  );
}

export default Header;
