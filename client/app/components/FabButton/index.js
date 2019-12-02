/**
 *
 * FabButton
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';
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

const Root = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  flex-grow: 1;
  transform: translateZ(0px);
`;

const StyledSpeedDial = styled(({ ...rest }) => <SpeedDial {...rest} />)`
  position: absolute;
  align-items: flex-end;
  bottom: ${props => props.theme.spacing(10)}px;
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
    <Root>
      <Backdrop open={open} />
      <div>
        <StyledSpeedDial
          ariaLabel="SpeedDial tooltip example"
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps = {{color: 'secondary'}}
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
      </div>
    </Root>
  );
}
