/**
 *
 * OrderListItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import MediumAvatar from 'components/MediumAvatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

function OrderListItem(props) {
  const { item, index, onClickItem } = props;

  // Put together the content of the Jap
  // Render the content into a list item
  return (
    item.alt_description != null && (
      <ListItem
        divider
        button
        onClick={() => (onClickItem ? onClickItem(index) : null)}
      >
        <Grid container justify="space-evenly">
          <Grid item>
            <ListItemAvatar>
              <MediumAvatar src={item.urls.thumb} alt={item.alt_description} />
            </ListItemAvatar>
          </Grid>
          <Grid item>
            <ListItemText
              primary={`Cumulé : ${item.height}`}
              secondary={`Individuel : ${item.likes}`}
            />
          </Grid>
        </Grid>
      </ListItem>
    )
  );
}

OrderListItem.propTypes = {
  item: PropTypes.object,
};

export default OrderListItem;
