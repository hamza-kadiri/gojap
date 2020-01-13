import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import GoJap from 'images/gojap.png';
import history from 'utils/history';
import Img from './Img';

const Logo = styled.div`
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

function Header() {
  return (
    <Logo onClick={() => history.push('/')}>
      <Img src={GoJap} alt="gojap-logo" />
      <StyledTypography variant="h6">Go Jap !</StyledTypography>
    </Logo>
  );
}

export default Header;
