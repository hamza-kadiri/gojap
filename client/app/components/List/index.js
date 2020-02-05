import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { List as VList, AutoSizer, WindowScroller } from 'react-virtualized';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import AutoSizerWrapper from './AutoSizerWrapper';

const MoreResults = ({ items, setShowMore }) => (
  <ListItem button onClick={() => setShowMore(true)}>
    <ListItemIcon>
      <ExpandMoreIcon />
    </ListItemIcon>
    <ListItemText primary={`${items.length - 6} de plus`} secondary="" />
  </ListItem>
);

const VirtualizedList = styled(VList)`
  outline: none;
`;

const List = memo(function List(props) {
  const ComponentToRender = props.component;
  const { onClickItem, isWindowScroller, ...rest } = props;
  const [showMore, setShowMore] = useState(false);
  function rowRenderer({ key, index, style }) {
    if (props.items) {
      const item = props.items[index];
      return (
        <div key={key} style={style}>
          <ComponentToRender
            item={item}
            index={index}
            onClickItem={onClickItem}
            {...rest}
          />
        </div>
      );
    }
    return <ComponentToRender />;
  }

  rowRenderer.propTypes = {
    key: PropTypes.string,
    index: PropTypes.number,
    style: PropTypes.object,
  };
  return (
    <AutoSizerWrapper>
      {isWindowScroller ? (
        <WindowScroller>
          {({ height, width, isScrolling, onChildScroll, scrollTop }) => (
            <React.Fragment>
              <VirtualizedList
                autoHeight
                width={width}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                height={height}
                rowCount={(props.items.length > 6) ? (showMore ? props.items.length : 6) : props.items.length}
                rowHeight={props.multiline ? 72 : 49}
                rowRenderer={rowRenderer}
              />
              {props.items.length > 6 && !showMore && (
                <MoreResults items={props.items} setShowMore={setShowMore} />
              )}
            </React.Fragment>
          )}
        </WindowScroller>
      ) : (
          <AutoSizer>
            {({ height, width }) => (
              <VirtualizedList
                width={width}
                height={height}
                rowCount={props.items.length}
                rowHeight={props.multiline ? 72 : 49}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
    </AutoSizerWrapper>
  );
});

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
  multiline: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default List;
