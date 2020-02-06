import React, { memo } from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const NotFoundComponent = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ListWrapper = memo(function ListWrapper({
  loading,
  error,
  items,
  component,
  multiline,
  isWindowScroller,
  onClickItem,
  ...rest
}) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <div>Something went wrong, please try again!</div>
    );
    return <ErrorComponent />;
  }

  if (items && items.length > 0) {
    return (
      <List
        items={items}
        multiline={multiline}
        isWindowScroller={isWindowScroller}
        component={component}
        onClickItem={onClickItem}
        {...rest}
      />
    );
  }

  return (
    <NotFoundComponent variant="subtitle1">
      Aucune donnée à afficher.
    </NotFoundComponent>
  );
});

ListWrapper.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.any,
  component: PropTypes.func,
  multiline: PropTypes.bool,
  isWindowScroller: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default ListWrapper;
