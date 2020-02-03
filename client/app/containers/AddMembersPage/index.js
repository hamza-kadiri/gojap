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
import history from 'utils/history';
import { changeTitle } from 'containers/Header/actions';
import { makeSelectJapId } from 'containers/User/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMembers } from 'containers/AddTablePage/selectors';

import styled from 'styled-components';
import H1 from 'components/H1';

import makeSelectAddMembersPage, { makeSelectUsers } from './selectors';
import reducer from './reducer';
import { loadUsers, addMembersToJap } from './actions';
import saga from './saga';

export function AddMembersPage({ dispatch, users, japId }) {
  useInjectReducer({ key: 'addMembersPage', reducer });
  useInjectSaga({ key: 'addMembersPage', saga });
  const [membersList, setMembersList] = React.useState([]);

  const Wrapper = styled.div`
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
  `;

  useEffect(() => {
    dispatch(loadUsers());
    dispatch(changeTitle('Ajouter des membres'));
  }, []);

  const handleClickOnUser = item => {
    const list = membersList;
    if (membersList.includes(item)) {
      list.pop(item);
      setMembersList(list);
    } else {
      list.push(item);
      setMembersList(list);
    }
  };

  const handleClickValidate = () => {
    if (membersList.length !== 0) {
      dispatch(addMembersToJap(membersList, japId));
    }
    history.goBack();
  };

  const membersListProps = {
    loading: false,
    error: false,
    items: users,
    component: MembersListItem,
    multiline: true,
    onClickItem: handleClickOnUser,
  };

  return (
    <Wrapper>
      <H1>Ajouter un membre:</H1>
      <ListWrapper {...membersListProps} />
      <StyledButton
        disable={membersList.length === 0 ? 'true' : 'false'}
        onClick={handleClickValidate}
      >
        {' '}
        Valider{' '}
      </StyledButton>
    </Wrapper>
  );
}

AddMembersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array,
  japId: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  addMembersPage: makeSelectAddMembersPage(),
  users: makeSelectUsers(),
  japId: makeSelectJapId(),
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
