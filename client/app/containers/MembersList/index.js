/**
 *
 * MembersList
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import MembersListItem from 'components/MembersListItem';
import ListWrapper from 'components/ListWrapper';
import Wrapper from 'components/FlexHeightWrapper';

import makeSelectMembersList from './selectors';
import reducer from './reducer';
import saga from './saga';

export function MembersList({ dispatch, members, membersList }) {
  useInjectReducer({ key: 'membersList', reducer });
  useInjectSaga({ key: 'membersList', saga });

  const membersListProps = {
    error: false,
    loading: false,
    items: members,
    component: MembersListItem,
    multiline: true,
    isWindowScroller: true,
  };

  return <ListWrapper {...membersListProps} />;
}

MembersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  membersList: makeSelectMembersList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(MembersList);
