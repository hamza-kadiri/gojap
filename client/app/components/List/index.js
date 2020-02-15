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

const List = ({
  component: ComponentToRender,
  onClickItem,
  isWindowScroller,
  items,
  multiline,
  selectedItems,
  ...rest
}) => {
  const [showMore, setShowMore] = useState(false);

  function rowRenderer({ key, index, style }) {
    if (items) {
      const item = items[index];
      return (
        <div key={key} style={style}>
          <ComponentToRender
            item={item}
            index={index}
            onClickItem={onClickItem}
            selectedItems={selectedItems}
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
    isWindowScroller: PropTypes.bool,
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
                rowCount={
                  items.length > 6
                    ? showMore
                      ? items.length
                      : 6
                    : items.length
                }
                rowHeight={multiline ? 72 : 49}
                rowRenderer={rowRenderer}
              />
              {items.length > 6 && !showMore && (
                <MoreResults items={items} setShowMore={setShowMore} />
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
              rowCount={items.length}
              rowHeight={multiline ? 72 : 49}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      )}
    </AutoSizerWrapper>
  );
};

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
  multiline: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default List;
