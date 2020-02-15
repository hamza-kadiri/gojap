/**
 *
 * MembersListItem
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import MediumAvatar from 'components/MediumAvatar';
import Chip from '@material-ui/core/Chip';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import styled from 'styled-components';
import _ from 'lodash';
import EventSeatIcon from '@material-ui/icons/EventSeat';

const Dot = styled.div`
  position: absolute;
  background-color: #00af33;
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
  const {
    item,
    index,
    onClickItem,
    stats,
    onlineMembers,
    jap,
    selectedItems,
  } = props;
  const [isSelected, setIsSelected] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [tableId, setTableId] = React.useState(null);
  const [emperor, setIsEmperor] = React.useState(false);

  useEffect(() => {
    if (selectedItems) {
      setIsSelected(selectedItems.includes(item));
    }
  });

  const handleClickItem = () => {
    onClickItem(item);
    setIsSelected(selectedItems.includes(item));
  };

  useEffect(() => {
    if (onlineMembers) {
      setIsOnline(onlineMembers.map(member => member.id).includes(item.id));
    }
    if (jap) {
      const currentTable = jap.tables.filter(table =>
        _.find(table.members, member => member.id === item.id)
      )[0];
      if (currentTable) {
        setTableId(currentTable.id);
        setIsEmperor(currentTable.emperor == item.id);
      }
    }
  }, [jap, onlineMembers]);

  const children =
    stats || tableId ? (
      <Chip
        size="small"
        color="primary"
        icon={emperor ? <EventSeatIcon /> : null}
        variant="outlined"
        component="span"
        label={
          // eslint-disable-next-line no-nested-ternary
          stats ? `${item.calories || '0'} calories` : `Table ${tableId}`
        }
      />
    ) : null;

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
          {isOnline && <Dot />}
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
  onClickItem: PropTypes.func,
};

export default MembersListItem;
