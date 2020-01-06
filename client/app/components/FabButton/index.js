/**
 *
 * FabButton
 *
 */

import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import PeopleIcon from '@material-ui/icons/People';
import styled from 'styled-components';

const actions = [
  { icon: <LocalDiningIcon />, name: 'Nouveau Jap' },
  { icon: <PeopleIcon />, name: 'Rejoindre' },
];

const StyledBackdrop = styled(Backdrop)`
  z-index: 1200;
`;

const StyledSpeedDial = styled(SpeedDial)`
  position: absolute;
  z-index: 1300;
  align-items: flex-end;
  bottom: ${props => props.theme.spacing(8)}px;
  right: ${props => props.theme.spacing(2)}px;
  .MuiSpeedDialAction-staticTooltipLabel {
    position: unset;
  }
  .MuiSpeedDialAction-staticTooltip {
    justify-content: flex-end;
  }
`;
export default function FabButton() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <StyledBackdrop open={open} />
      <StyledSpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{ color: 'secondary' }}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            tooltipPlacement="left"
            onClick={handleClose}
          />
        ))}
      </StyledSpeedDial>
    </React.Fragment>
  );
}
