import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { BrowserView, MobileView } from 'react-device-detect';
import StyledNavigation from './StyledNavigation';
import Wrapper from './Wrapper';
import styled from 'styled-components';

function MobileFooter({ children }) {
  return <StyledNavigation>{Children.toArray(children)}</StyledNavigation>;
}

MobileFooter.propTypes = {
  children: PropTypes.element,
};

const StyledWrapper = styled(Wrapper)`
  padding: 1em 0;
`;

function Footer() {
  return (
    <StyledWrapper>
      <MobileView>
        <MobileFooter />
      </MobileView>
      <BrowserView>
        <MobileFooter />
      </BrowserView>
    </StyledWrapper>
  );
}

export default Footer;
