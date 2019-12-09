/**
 *
 * HomePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Menu from 'components/Menu';
import Fab from 'components/FabButton';
import saga from './saga';
import JapListItem from 'components/JapListItem';
import ListWrapper from 'components/ListWrapper';
import styled from 'styled-components';
import H1 from 'components/H1';
import reducer from './reducer';
import makeSelectHomePage, {
  makeSelectJaps,
  makeSelectError,
  makeSelectLoading,
} from './selectors';
import { loadJaps } from './actions';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export function HomePage({ dispatch, loading, error, japs }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    dispatch(loadJaps());
  }, []);

  const japsListProps = {
    loading,
    error,
    items: japs,
    component: JapListItem,
    multiline: true,
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Fab />
      <Menu/>
      <H1>Home Page</H1>
      <ListWrapper {...japsListProps} />
    </Wrapper>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  japs: PropTypes.array,
  error: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  japs: makeSelectJaps(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
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

export default compose(withConnect)(HomePage);
