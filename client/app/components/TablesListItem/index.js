/**
 *
 * TablesListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

function TablesListItem(props) {
  const { item, onClickItem } = props;
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClickItem = () => {
    setIsSelected(!isSelected);
    onClickItem(item);
  };

  return (
    <ListItem
      selected={isSelected}
      button={onClickItem != null}
      divider={onClickItem != null}
      onClick={() => (onClickItem ? handleClickItem() : null)}
    >
      <Grid container justify="flex-start" spacing={2}>
        <Grid item>
          <ListItemText
            primary={`Table n° ${item.id}`}
            secondary={`${
              item.members ? 'Avec' : 'Pas de membres'
            } ${item.members &&
              item.members.map(member => ` ${member.username}`)}`}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
TablesListItem.propTypes = {
  item: PropTypes.object,
  onClickItem: PropTypes.func,
};

export default TablesListItem;
