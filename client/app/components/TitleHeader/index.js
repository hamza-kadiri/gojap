/**
 *
 * TitleHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import history from 'utils/history';
const TitleButton = styled(ButtonBase)`
  display: block;
  min-width: 0;
  text-align: start;
  flex: 1;
`;

const Title = styled.div``;
const Subtitle = styled.div``;

const StyledIconButton = styled(IconButton)`
  color: ${props => props.theme.palette.common.white};
`;

const members = ['Member 1', 'Member 2', 'Member 3', 'Member 4', 'Member 5'];

function TitleHeader({ title }) {
  return (
    <React.Fragment>
      <StyledIconButton onClick={() => history.goBack()} aria-label="Back">
        <ArrowBackIcon />
      </StyledIconButton>
      <TitleButton>
        <Title>
          <Typography noWrap variant="h6" component="h1">
            {title}
          </Typography>
        </Title>
        <Subtitle>
          <Typography noWrap variant="body2">
            {members.join(', ')}
          </Typography>
        </Subtitle>
      </TitleButton>
    </React.Fragment>
  );
}

TitleHeader.propTypes = {
  title: PropTypes.string,
};

export default TitleHeader;
