import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { BrowserView, MobileView } from 'react-device-detect';
import StyledNavigation from './StyledNavigation';
import Wrapper from './Wrapper';

function MobileFooter({ children }) {
  return <StyledNavigation>{Children.toArray(children)}</StyledNavigation>;
}

MobileFooter.propTypes = {
  children: PropTypes.element,
};

function Footer() {
  return (
    <Wrapper>
      <MobileView>
        <MobileFooter />
      </MobileView>
      <BrowserView>
        <MobileFooter />
      </BrowserView>
    </Wrapper>
  );
}

export default Footer;
