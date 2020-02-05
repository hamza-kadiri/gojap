/**
 *
 * MembersList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import MembersListItem from 'components/MembersListItem';
import ListWrapper from 'components/ListWrapper';
import Wrapper from 'components/FlexHeightWrapper';
import { makeSelectTableId } from '../User/selectors';
import { makeSelectOnlineMembers } from '../JapScreen/selectors';

import makeSelectMembersList from './selectors';
import reducer from './reducer';

export function MembersList({ dispatch, members, tableId, onlineMembers }) {
  useInjectReducer({ key: 'membersList', reducer });
  const membersListProps = {
    error: false,
    loading: false,
    items: members,
    component: MembersListItem,
    multiline: true,
    isWindowScroller: true,
    tableId,
    onlineMembers,
  };

  return <ListWrapper {...membersListProps} />;
}

MembersList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  members: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  membersList: makeSelectMembersList(),
  tableId: makeSelectTableId(),
  onlineMembers: makeSelectOnlineMembers(),
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
