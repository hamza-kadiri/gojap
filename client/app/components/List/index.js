import React from 'react';
import PropTypes from 'prop-types';
import { List as VList, AutoSizer } from 'react-virtualized';
import AutoSizerWrapper from './AutoSizerWrapper';

function List(props) {
  const ComponentToRender = props.component;

  function rowRenderer({ key, index, style }) {
    if (props.items) {
      return (
        <div key={key} style={style}>
          <ComponentToRender item={props.items[index]} />
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
      <AutoSizer>
        {({ height, width }) => (
          <VList
            width={width}
            height={height}
            rowCount={props.items.length}
            rowHeight={props.multiline ? 72 : 49}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </AutoSizerWrapper>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
  multiline: PropTypes.bool,
};

export default List;
