/**
 *
 * AddMembersPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ListWrapper from 'components/ListWrapper';
import MembersListItem from 'components/MembersListItem';
import StyledButton from 'components/Button';
import { changeTitle } from 'containers/Header/actions';
import { makeSelectJapId } from 'containers/User/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMembers } from 'containers/AddTablePage/selectors';

import styled from 'styled-components';
import H1 from 'components/H1';

import japScreenReducer from 'containers/JapScreen/reducer';
import japScreenSaga from 'containers/JapScreen/saga';
import { getJap } from 'containers/JapScreen/actions';
import makeSelectAddMembersPage, { makeSelectUsers } from './selectors';
import reducer from './reducer';
import { loadUsers, addMembersToJap } from './actions';
import saga from './saga';

const customIncludes = (array, item) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i].id === item.id) {
      return true;
    }
  }
  return false;
};

export function AddMembersPage({
  dispatch,
  users,
  japId,
  members,
  addMembersPage,
}) {
  useInjectReducer({ key: 'addMembersPage', reducer });
  useInjectReducer({ key: 'japScreen', reducer: japScreenReducer });
  useInjectSaga({ key: 'addMembersPage', saga });
  useInjectSaga({ key: 'japScreen', saga: japScreenSaga });
  const [membersToAdd, setMembersToAdd] = React.useState([]);
  const [usersNotInMembers, setUserNotInMembers] = React.useState([]);

  const Wrapper = styled.div`
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
  `;

  useEffect(() => {
    dispatch(getJap(japId));
    dispatch(loadUsers());
    dispatch(changeTitle('Ajouter des membres'));
  }, []);

  useEffect(() => {
    if (users && members) {
      const filteredUsers = users.filter(
        user => !customIncludes(members, user)
      );
      setUserNotInMembers(filteredUsers);
    }
  }, [users, members]);

  const handleClickOnUser = item => {
    const newMembersList = membersToAdd;
    if (newMembersList.includes(item)) {
      newMembersList.splice(newMembersList.indexOf(item), 1);
      setMembersToAdd(newMembersList);
    } else {
      newMembersList.push(item);
      setMembersToAdd(newMembersList);
    }
  };

  const handleClickValidate = () => {
    if (membersToAdd.length !== 0) {
      dispatch(addMembersToJap(membersToAdd, japId));
    }
  };

  const membersListProps = {
    loading: addMembersPage.loading,
    error: addMembersPage.error,
    items: usersNotInMembers,
    component: MembersListItem,
    multiline: true,
    onClickItem: handleClickOnUser,
    selectedItems: membersToAdd,
  };

  return (
    <Wrapper>
      <H1>Ajouter un membre:</H1>
      <ListWrapper {...membersListProps} />
      {!addMembersPage.loading && (
        <StyledButton
          disable={membersToAdd.length === 0 ? 'true' : 'false'}
          onClick={handleClickValidate}
        >
          Valider
        </StyledButton>
      )}
    </Wrapper>
  );
}

AddMembersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array,
  japId: PropTypes.number,
  members: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  addMembersPage: makeSelectAddMembersPage(),
  users: makeSelectUsers(),
  japId: makeSelectJapId(),
  members: makeSelectMembers(),
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
