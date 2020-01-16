/**
 *
 * AddTablePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { changeTitle } from 'containers/Header/actions';
import { useInjectReducer } from 'utils/injectReducer';
import TextField from '@material-ui/core/TextField';
import StyledButton from 'components/Button';
import styled from 'styled-components';
import H1 from 'components/H1';
import MembersListItem from 'components/MembersListItem';
import ListWrapper from 'components/ListWrapper';
import history from 'utils/history'

import makeSelectAddTablePage from './selectors';
import reducer from './reducer';

export function AddTablePage({ dispatch, members }) {
  useInjectReducer({ key: 'addTablePage', reducer });
  const [name, setName] = React.useState();

  useEffect(() => {
    // dispatch(loadMembers()); /// Code the action
    dispatch(changeTitle('Ajouter une table'));
  }, []);

  const Wrapper = styled.div`
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
  `;
  const testmembers = [
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

  const handleClickOnMember = item => {
    console.log('click on member', item);
  };

  const handleClickOnEmperor = item => {
    console.log('click on emperor', item);
  };

  const membersListProps = {
    loading: false,
    error: false,
    items: testmembers,
    component: MembersListItem,
    multiline: true,
    onClickItem: handleClickOnMember,
  };

  const emperorListProps = {
    loading: false,
    error: false,
    items: testmembers,
    component: MembersListItem,
    multiline: true,
    onClickItem: handleClickOnEmperor,
  };

  const handleClickValidate = () => {
    console.log('valider');
    history.goBack();
  };

  return (
    <Wrapper>
      <H1>Ajouter une table:</H1>
      <TextField
        label="Nom de la table"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <p>Empereur:</p>
      <ListWrapper {...membersListProps} />
      <p>Membres:</p>
      <ListWrapper {...emperorListProps} />
      <StyledButton onClick={handleClickValidate}> Créer la table </StyledButton>
    </Wrapper>
  );
}

// route /table/adduser

AddTablePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  addTablePage: makeSelectAddTablePage(),
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

export default compose(withConnect)(AddTablePage);
