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
import { makeSelectLogin } from './selectors';
import { login } from './actions';
import reducer from './reducer';
import saga from './saga';

export function LoginContainer({ dispatch, user }) {
  useInjectReducer({ key: 'loginContainer', reducer });
  useInjectSaga({ key: 'loginContainer', saga });

  const [name, setName] = React.useState();

  const handleClick = () => {
    // Call back to create jap
    dispatch(login(name));
  };

  if (user.id !== null) {
    history.push('/');
  }

  return (
    <ContainerWrapper>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "5 %" }}>
        <H1>Login</H1>
        <TextField
          label="Your name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <StyledButton onClick={handleClick}>Login</StyledButton>
      </div>
    </ContainerWrapper>
  );
}

LoginContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectLogin(),
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
