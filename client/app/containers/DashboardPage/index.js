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

import { getStats } from './actions';
import makeSelectDashboardPage, { makeSelectStats } from './selectors';
import reducer from './reducer';
import saga from './saga';

const StyledTitle = styled(H1)`
  font-size: 20px;
`;

const StyledData = styled(H1)`
  color: #2d5f9a;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const StyledContainerWrapper = styled(ContainerWrapper)`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

export function DashboardPage({ dispatch, stats }) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <StyledContainerWrapper>
      <Helmet>
        <title>Statistiques</title>
        <meta name="description" content="Description of DashboardPage" />
      </Helmet>
      <StyledTitle>Nb de calories ingurgitées</StyledTitle>
      <StyledData>{stats.nbr_of_cals}</StyledData>
      <StyledTitle>Nb de sushis mangés</StyledTitle>
      <StyledData>{stats.nbr_of_items}</StyledData>
      <StyledTitle>Nb de japs</StyledTitle>
      <StyledData>{stats.nbr_of_japs}</StyledData>
      <StyledTitle>Nb de pneus mangés </StyledTitle>
      <StyledData>{stats.nbr_of_pneu}</StyledData>
    </StyledContainerWrapper>
  );
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
  stats: makeSelectStats(),
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
