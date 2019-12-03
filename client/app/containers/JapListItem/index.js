/**
 * JapListItem
 *
 * Lists the japs
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

export function JapListItem(props) {
  const { item } = props;

  console.log(item);

  // Put together the content of the Jap
  // Render the content into a list item
  return (
    <ListItem divider button>
      <Grid container justify="space-between">
        <Grid item>
          <ListItemText
            primary={item.name}
            secondary={item.location.display_address.join(', ')}
          />
        </Grid>
        <Grid item>
          <ListItemText
            primary={item.display_phone}
            secondary={`${Math.round(item.distance / 10) * 10} m`}
            secondaryTypographyProps={{ align: 'right' }}
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}

JapListItem.propTypes = {
  item: PropTypes.object,
};

export default JapListItem;
