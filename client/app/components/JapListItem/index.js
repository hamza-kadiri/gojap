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
import moment from 'moment';

moment.locale('fr');
export function JapListItem(props) {
  const { item, onClickItem } = props;
  // Put together the content of the Jap
  // Render the content into a list item
  return (
    <ListItem
      divider
      button
      onClick={() => {
        onClickItem(item.id);
      }}
    >
      {item.event_name ? (
        <Grid container justify="space-between">
          <Grid item>
            <ListItemText
              primary={item.event_name}
              secondary={moment(item.date).format('llll')}
            />
          </Grid>
          <Grid item>
            <ListItemText
              primary={`${item.members.length} participants`}
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
