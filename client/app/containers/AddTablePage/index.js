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
import { useInjectSaga } from 'utils/injectSaga';
import StyledButton from 'components/Button';
import H1 from 'components/H1';
import history from 'utils/history';
import ContainerWrapper from 'components/ContainerWrapper';

import makeSelectAddTablePage from './selectors';
import { addTable } from './actions';
import reducer from './reducer';
import saga from './saga';

export function AddTablePage({ dispatch }) {
  useInjectReducer({ key: 'addTablePage', reducer });
  useInjectSaga({ key: 'addTablePage', saga });

  useEffect(() => {
    dispatch(changeTitle('Ajouter une table'));
  }, []);

  const handleClickValidate = () => {
    dispatch(addTable());
  };

  return (
    <ContainerWrapper>
      <H1>Ajouter une table:</H1>
      <StyledButton onClick={handleClickValidate}>Créer la table</StyledButton>
    </ContainerWrapper>
  );
}

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
