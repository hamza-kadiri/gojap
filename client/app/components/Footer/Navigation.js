import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/List';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonIcon from '@material-ui/icons/Person';
import history from 'utils/history';
export default function Navigation(props) {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      className={props.className}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction
        label="Liste des japs"
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
    </BottomNavigation>
  );
}
