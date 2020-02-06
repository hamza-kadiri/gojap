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
import ContainerWrapper from 'components/ContainerWrapper';
import { useInjectReducer } from 'utils/injectReducer';
import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';

import makeSelectUser from '../User/selectors';
import reducer from './reducer';
import saga from './saga';
import { logout } from '../User/actions';

const StyledAvatar = styled(BigAvatar)`
  margin-bottom: 20px;
`;

export function ProfilePage({ dispatch, user }) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of ProfilePage" />
      </Helmet>
      <ContainerWrapper>
        <H1 style={{margin: '20px auto'}}>{user.username}</H1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '5 %',
          }}
        >
          <StyledAvatar src={user.avatar_url} />
          <Typography variant="subtitle2" component="p">
            Email : {user.email}
          </Typography>
          <Typography variant="subtitle2" component="p">
            Tel : {user.phone}
          </Typography>
          {user.calorie && (
            <Typography variant="subtitle2" component="p">
              Calories : {user.calorie}
            </Typography>
          )}
          {user.achievements && user.achievements.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                'margin-top': '10px',
                'margin-bottom': '5px',
              }}
            >
              <Typography variant="subtitle2" component="p">
                Réussites:
              </Typography>
              {user.achievements.map(ach => (
                <Typography variant="subtitle2" component="p">
                  <CheckCircleIcon style={{color: '#7CFC00', height: '15px', 'margin-bottom': '3px'}}/>
                  {ach.name}{'   '}
                </Typography>
              ))}
            </div>
          )}
        </div>
        <StyledButton onClick={handleClick}>LOGOUT</StyledButton>
      </ContainerWrapper>
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
