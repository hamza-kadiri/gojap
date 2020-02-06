/**
 *
 * JapaneseItemIcon
 *
 */

import React from 'react';
import BigAvatar from 'components/BigAvatar';
import MediumAvatar from 'components/MediumAvatar';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

const MediumItemIcon = styled(MediumAvatar)`
  opacity: 0.3;
`;
function JapaneseItemIcon({ src, size, className, disabled, ...rest }) {
  return size === 'medium' ? (
    <div className={className}>
      <IconButton disabled={disabled} size="small" {...rest}>
        <MediumItemIcon src={src} />
      </IconButton>
    </div>
  ) : (
    <div>
      <BigAvatar className={className} src={src} {...rest} />
    </div>
  );
}

JapaneseItemIcon.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default JapaneseItemIcon;
