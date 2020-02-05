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
import styled from 'styled-components';

const Dot = styled.div`
  position: absolute;
  background-color: #00AF33;
  width: 20px;
  height: 20px;
  top: 10px;
  left: 10px;
  border-style: solid;
  border-color: white;
  border-width: 3px;
  border-radius: 10px;
`;

function MembersListItem(props) {
  const { item, index, onClickItem, stats, tableId, onlineMembers } = props;
  const [isSelected, setIsSelected] = React.useState(false);

  const handleClickItem = () => {
    setIsSelected(!isSelected);
    onClickItem(item);
  };
  console.log(onlineMembers);
  const isOnline = onlineMembers ? onlineMembers.map(member => member.id).includes(item.id) : false;

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
    <ListItem selected={isSelected} button={onClickItem} divider={onClickItem} onClick={() => (onClickItem ? handleClickItem() : null)}>
      <Grid container justify="flex-start" spacing={2}>
        <Grid item>
          <ListItemAvatar>
            <MediumAvatar src={item.avatar_url && item.picture.medium} alt={item.username} />
            {isOnline && <Dot />}
          </ListItemAvatar>
        </Grid>
        <Grid item>
          <ListItemText primary={item.username} secondary={children} />
        </Grid>
      </Grid>
    </ListItem>
  );
}
MembersListItem.propTypes = {
  item: PropTypes.object,
};

export default MembersListItem;
