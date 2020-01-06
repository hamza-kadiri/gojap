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

const Root = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  bottom: 0;
  right: 0;
  flex-grow: 1;
  transform: translateZ(0px);
`;

const StyledSpeedDial = styled(({ ...rest }) => <SpeedDial {...rest} />)`
  position: absolute;
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

  const handleClose = action => () => {
    console.log('in handle close', action);
    setOpen(true);
  };

  const handleClickNewJap = () => {
    console.log('in handle click');
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
      <Root>
        <Backdrop open={open} />
      </Root>
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
            onClick={action.handleClick}
          />
        ))}
      </StyledSpeedDial>
    </React.Fragment>
  );
}
