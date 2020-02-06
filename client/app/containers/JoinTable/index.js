/**
 *
 * JoinTable
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ContainerWrapper from 'components/ContainerWrapper';
import H1 from 'components/H1';
import { changeTitle } from 'containers/Header/actions';
import ListWrapper from 'components/ListWrapper';
import TablesListItem from 'components/TablesListItem';
import StyledButton from 'components/Button';
import history from 'utils/history';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectJoinTable, { makeSelectTables } from './selectors';
import reducer from './reducer';
import { getTables, joinTable } from './actions';
import saga from './saga';
import { addTable } from '../AddTablePage/actions';

export function JoinTable({ dispatch, tables }) {
  useInjectReducer({ key: 'joinTable', reducer });
  useInjectSaga({ key: 'joinTable', saga });

  useEffect(() => {
    dispatch(changeTitle('Rejoindre une table'));
    dispatch(getTables());
  }, []);

  const handleCickOnTable = table => {
    dispatch(joinTable(table.id));
  };

  const tablesListProps = {
    loading: false,
    error: false,
    items: tables,
    component: TablesListItem,
    multiline: true,
    onClickItem: handleCickOnTable,
  };

  const handleClickValidate = () => {
    dispatch(addTable());
    history.goBack();
  };

  return (
    <ContainerWrapper>
      <H1>Rejoindre une table:</H1>
      <ListWrapper {...tablesListProps} />
      <ContainerWrapper>
        <StyledButton onClick={handleClickValidate}>
          Créer une table et la rejoindre.
        </StyledButton>
      </ContainerWrapper>
    </ContainerWrapper>
  );
}

JoinTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tables: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  joinTable: makeSelectJoinTable(),
  tables: makeSelectTables(),
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

export default compose(withConnect)(JoinTable);
