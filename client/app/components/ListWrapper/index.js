import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';

function ListWrapper({ loading, error, items, component, multiline, ...rest }) {
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
        component={component}
        {...rest}
      />
    );
  }

  return null;
}

ListWrapper.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.any,
  component: PropTypes.func,
  multiline: PropTypes.bool,
  onClickItem: PropTypes.func,
};

export default ListWrapper;
