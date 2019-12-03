import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import LoadingIndicator from 'components/LoadingIndicator';
import JapListItem from 'containers/JapListItem';

function JapsList({ loading, error, japs }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <div>Something went wrong, please try again!</div>
    );
    return <ErrorComponent />;
  }

  if (japs.length > 0) {
    return <List items={japs} component={JapListItem} />;
  }

  return null;
}

JapsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  japs: PropTypes.any,
};

export default JapsList;
