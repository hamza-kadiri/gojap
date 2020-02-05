/**
 *
 * MembersListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import MediumAvatar from 'components/MediumAvatar';
import Chip from '@material-ui/core/Chip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

function MembersListItem(props) {
  const { item, index, onClickItem, stats, tableId } = props;
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClickItem = () => {
    setIsSelected(!isSelected);
    onClickItem(item);
  };

  let children = tableId && !stats && (
    <Chip
      size="small"
      color="primary"
      variant="outlined"
      component="span"
      label={`table : ${tableId}`}
    />
  );
  if (stats) {
    children = (
      <Chip
        size="small"
        color="primary"
        variant="outlined"
        component="span"
        label={`${item.calories || '0'} calories`}
      />
    );
  }

  return (
    <ListItem
      selected={isSelected}
      button={onClickItem != null}
      divider={onClickItem != null}
      onClick={() => (onClickItem ? handleClickItem() : null)}
    >
      <Grid container justify="flex-start" spacing={2}>
        <Grid item>
          <ListItemAvatar>
            <MediumAvatar
              src={item.avatar_url && item.picture.medium}
              alt={item.username}
            />
          </ListItemAvatar>
        </Grid>
        <Grid item>
          <ListItemText primary={item.username} secondary={children} />
          {/* {tableId && !stats && (
            <ListItemText
              primary={item.username}
              secondary={
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  component="span"
                  label={`table : ${tableId}`}
                />
              }
            />
          )}
          {stats && (
            <ListItemText
              primary={item.username}
              secondary={
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  component="span"
                  label={`${item.calories || '0'} calories`}
                />
              }
            />
          )} */}
        </Grid>
      </Grid>
    </ListItem>
  );
}
MembersListItem.propTypes = {
  item: PropTypes.object,
  onClickItem: PropTypes.func,
};

export default MembersListItem;
