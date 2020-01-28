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
import { isBrowser } from 'react-device-detect';
import history from 'utils/history';

export function JapListItem(props) {
  const { item, onClickItem } = props;
  // Put together the content of the Jap
  // Render the content into a list item
  return (
    <ListItem
      divider
      button
      onClick={() => {
        onClickItem(item.alias);
      }}
    >
      {item.name ? (
        <Grid container justify="space-between">
          <Grid item>
            <ListItemText
              primary={item.name}
              secondary={
                isBrowser &&
                item.location &&
                item.location.display_address &&
                item.location.display_address.join(', ')
              }
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
      ) : (
        <ListItemText primary="" secondary="" />
      )}
    </ListItem>
  );
}

JapListItem.propTypes = {
  item: PropTypes.object,
};

export default JapListItem;
