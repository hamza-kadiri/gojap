/**
 *
 * LoginContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ContainerWrapper from 'components/ContainerWrapper';
import TextField from '@material-ui/core/TextField';
import history from 'utils/history';
import H1 from 'components/H1';
import StyledButton from 'components/Button';
import LoadingIndicator from 'components/LoadingIndicator';
import styled from 'styled-components';
import makeSelectUser, { makeSelectLoginLoading } from '../User/selectors';
import { login } from '../User/actions';
import reducer from '../User/reducer';
import saga from '../User/saga';

const LoginButton = styled(StyledButton)`
  width: 100px;
`;

export function LoginContainer({ dispatch, loading }) {
  useInjectReducer({ key: 'loginContainer', reducer });
  useInjectSaga({ key: 'loginContainer', saga });

  const [name, setName] = React.useState('');

  const handleClick = () => {
    // Call back to create jap
    dispatch(login(name));
  };

  return (
    <ContainerWrapper>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '5 %',
        }}
      >
        <H1>Pseudo</H1>
        <TextField
          label="Entrez votre pseudo"
          value={name}
          onChange={event => setName(event.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleClick()}
        />
        {loading ? (
          <LoginButton>
            <LoadingIndicator size={24} />
          </LoginButton>
        ) : (
          <LoginButton onClick={handleClick}>Login</LoginButton>
        )}
      </div>
    </ContainerWrapper>
  );
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoginLoading(),
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

export default compose(withConnect)(LoginContainer);
