import React, { Children } from 'react';
import { FormattedMessage } from 'react-intl';
import A from 'components/A';
import StyledNavigation from './StyledNavigation';
import Wrapper from './Wrapper';
import messages from './messages';

function MobileFooter(props) {
  return (
    <StyledNavigation>{Children.toArray(props.children)}</StyledNavigation>
  );
}

function DesktopFooter() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/mxstbr">Max Stoiber</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}
function Footer() {
  return (
    <Wrapper>
      <MobileFooter />
    </Wrapper>
  );
}

export default Footer;
