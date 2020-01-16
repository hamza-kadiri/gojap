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
import history from 'utils/history'
import { changeTitle } from 'containers/Header/actions';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import styled from 'styled-components';
import H1 from 'components/H1';

import makeSelectAddMembersPage from './selectors';
import reducer from './reducer';
import { loadUsers } from './actions';
import saga from './saga';

export function AddMembersPage({ dispatch, users, error }) { //addMembersPage) {
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

  const members = [
    { id: 4, name: { first: 'Annelo', last: 'delo' } },
    { id: 5, name: { first: 'Smo', last: 'Koko' } },
    { id: 6, name: { first: 'Smo', last: 'Koko' } },
    { id: 7, name: { first: 'Annelo', last: 'delo' } },
    { id: 8, name: { first: 'Smo', last: 'Koko' } },
    { id: 9, name: { first: 'Smo', last: 'Koko' } },
    { id: 10, name: { first: 'Annelo', last: 'delo' } },
    { id: 11, name: { first: 'Smo', last: 'Koko' } },
    { id: 12, name: { first: 'Smo', last: 'Koko' } },
  ];

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
      console.log('validate'); // do an action
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
      <StyledButton disable={membersList.length === 0} onClick={handleClickValidate}> Valider </StyledButton>
    </Wrapper>
  );
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
