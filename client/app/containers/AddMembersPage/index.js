/**
 *
 * AddMembersPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ListWrapper from 'components/ListWrapper';
import MembersListItem from 'components/MembersListItem';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAddMembersPage from './selectors';
import reducer from './reducer';

export function AddMembersPage() { //addMembersPage) {
  useInjectReducer({ key: 'addMembersPage', reducer });

  const addMembersPage = {
    members: [],
  }

  const membersListProps = {
    ...addMembersPage,
    items: addMembersPage.members,
    component: MembersListItem,
    multiline: true,
    isWindowScroller: true,
  };

  return <ListWrapper {...membersListProps} />;
}

AddMembersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addMembersPage: makeSelectAddMembersPage(),
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

export default compose(withConnect)(AddMembersPage);
