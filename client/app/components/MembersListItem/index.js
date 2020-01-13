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
  const { item, index, onClickItem } = props;

  return (
    <ListItem onClick={() => (onClickItem ? onClickItem(index) : null)}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item>
          <ListItemAvatar>
            <MediumAvatar src={item.picture.medium} alt={item.name.first} />
          </ListItemAvatar>
        </Grid>
        <Grid item>
          <ListItemText
            primary={`${item.name.first} ${item.name.last}`}
            secondary={
              <Chip
                size="small"
                color="primary"
                variant="outlined"
                component="span"
                label={`Table ${(item.dob.age % 4) + 1}`}
              />
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
MembersListItem.propTypes = {
  item: PropTypes.object,
};

export default MembersListItem;
