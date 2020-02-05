/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Typography } from '@material-ui/core';
import { compose } from 'redux';
import H1 from 'components/H1';
import BigAvatar from 'components/BigAvatar';
import StyledButton from 'components/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUser from '../User/selectors';
import reducer from './reducer';
import saga from './saga';
import { logout } from '../User/actions';

export function ProfilePage({ dispatch, user }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });
  console.log(user);

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <H1>{user.username}</H1>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", margin: "5 %" }}>
        <BigAvatar src={user.avatar_url} />
        <Typography variant="subtitle2" component="p">
          Email : {user.email}
        </Typography>
        <Typography variant="subtitle2" component="p">
          phone : {user.phone}
        </Typography>
        <Typography variant="subtitle2" component="p">
          calorie : {user.calorie}
        </Typography>
        <Typography variant="subtitle2" component="p">
          achivements : {user.achievements}
        </Typography>
      </div>
      <StyledButton onClick={handleClick}>LOGOUT</StyledButton>
    </div>
  );
}

ProfilePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
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

export default compose(withConnect)(ProfilePage);
