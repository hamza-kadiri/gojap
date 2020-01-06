import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonIcon from '@material-ui/icons/Person';
import history from 'utils/history';
import styled from 'styled-components';

export default function Navigation(props) {
  const [value, setValue] = React.useState(0);

  const StyledBottomNavigation = styled(BottomNavigation)`
    background-color: #455366;
    .MuiBottomNavigationAction-root {
      color: #fff;
    }
  `;

  return (
    <StyledBottomNavigation
      className={props.className}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Japs"
        onClick={() => history.push('/')}
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        label="Statistiques"
        onClick={() => history.push('/dashboard')}
        icon={<ShowChartIcon />}
      />
      <BottomNavigationAction
        label="Profil"
        onClick={() => history.push('/profile')}
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        label="Socket Test"
        onClick={() => history.push('/socket')}
        icon={<PersonIcon />}
      />
    </StyledBottomNavigation>
  );
}
