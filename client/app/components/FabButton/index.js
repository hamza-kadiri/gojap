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
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
  { icon: <FavoriteIcon />, name: 'Like' },
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
  bottom: ${props => props.theme.spacing(10)}px;
  right: ${props => props.theme.spacing(2)}px;
  .MuiSpeedDialAction-staticTooltipLabel {
    position: unset;
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
      <StyledSpeedDial
        ariaLabel="SpeedDial tooltip example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
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
    </Root>
  );
}
