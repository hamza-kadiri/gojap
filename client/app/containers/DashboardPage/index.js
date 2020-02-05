/**
 *
 * DashboardPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import H1 from 'components/H1';
import ContainerWrapper from 'components/ContainerWrapper';
import ListWrapper from 'components/ListWrapper';
import styled from 'styled-components';
import MembersListItem from 'components/MembersListItem';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectJaps } from 'containers/HomePage/selectors';

import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const StyledTitle = styled(H1)`
  font-size: 24px;
`;

const StyledData = styled(H1)`
  color: #2d5f9a;
  margin-bottom: 30px;
  margin-top: 10px;
`;

const StyledContainerWrapper = styled(ContainerWrapper)`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const EatersWrapper = styled.div`
  width: 200px;
  height: 300px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100px',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function DashboardPage() {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });
  const classes = useStyles();

  const testUsers = [
    { id: 1, username: 'Annelo' },
    { id: 2, username: 'Annelo' },
    { id: 3, username: 'Annelo' },
  ];

  const membersListProps = {
    loading: false,
    error: false,
    items: testUsers,
    component: MembersListItem,
    multiline: true,
    classeName: classes.root,
    stats: true,
  };
  console.log(membersListProps)

  return (
    <StyledContainerWrapper>
      <Helmet>
        <title>Statistiques</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <StyledTitle>Nb de japs créés</StyledTitle>
      <StyledData>36</StyledData>
      <StyledTitle>Nb de sushis mangés</StyledTitle>
      <StyledData>10000</StyledData>
      <StyledTitle>Les plus gros mangeurs</StyledTitle>
      <EatersWrapper><ListWrapper {...membersListProps} /></EatersWrapper>
    </StyledContainerWrapper>
  );
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
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

export default compose(withConnect)(DashboardPage);
