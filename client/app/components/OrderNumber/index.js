/**
 *
 * OrderNumber
 *
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
const NumberWrapper = styled.span`
  font-size: ${props => (props.big ? `72px` : `42px`)};
  color: ${props => props.big && props.theme.palette.primary.main};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 0px 10px;
  height: 100%;
  flex: 1 1 0px;
  max-width: 200px;
`;

function OrderNumber({ title, number, big }) {
  return (
    <Column>
      <NumberWrapper big={big}>{number}</NumberWrapper>
      <Typography variant="overline">{title}</Typography>
    </Column>
  );
}

OrderNumber.propTypes = {};

export default OrderNumber;
