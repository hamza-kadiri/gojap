import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import GoJap from 'images/gojap.png';
import history from 'utils/history';
import { withRouter } from 'react-router-dom';
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

function Header(props) {
  const { pathname } = props.location;
  return (
    <Logo onClick={() => (pathname === '/login' ? null : history.push('/'))}>
      <Img src={GoJap} alt="gojap-logo" />
      <StyledTypography variant="h6">Go Jap !</StyledTypography>
    </Logo>
  );
}

Header.propTypes = {
  location: PropTypes.any,
};

export default withRouter(Header);
