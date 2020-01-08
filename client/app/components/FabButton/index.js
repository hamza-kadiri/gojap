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
import history from 'utils/history';

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
    color: ${props => props.theme.palette.common.white};
    background-color: ${props => props.theme.palette.primary.main};
  }
  .MuiSpeedDialAction-staticTooltip {
    justify-content: flex-end;
  }
  .MuiSpeedDialAction-fab {
    color: ${props => props.theme.palette.common.white};
    background-color: ${props => props.theme.palette.primary.main};
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

  const handleClickNewJap = () => {
    history.push('/newjap');
  };

  const actions = [
    {
      icon: <LocalDiningIcon />,
      name: 'Nouveau Jap',
      handleClick: handleClickNewJap,
    },
    { icon: <PeopleIcon />, name: 'Rejoindre', handleClick: handleClose },
  ];

  return (
    <React.Fragment>
      <StyledBackdrop open={open} />
      <StyledSpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        FabProps={{ color: 'primary' }}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            tooltipPlacement="left"
            onClick={action.handleClick}
          />
        ))}
      </StyledSpeedDial>
    </React.Fragment>
  );
}
