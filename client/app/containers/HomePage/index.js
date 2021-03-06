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
import Fab from 'components/FabButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import JapListItem from 'components/JapListItem';
import ListWrapper from 'components/ListWrapper';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import SubPage from 'components/SubPage';
import history from 'utils/history';

import reducer from './reducer';
import saga from './saga';

import makeSelectHomePage, {
  makeSelectJaps,
  makeSelectError,
  makeSelectLoading,
  makeSelectPastJaps,
} from './selectors';
import { loadJaps, loadPastJaps } from './actions';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledAppBar = styled(AppBar)`
  position: static;
`;

const StyledTab = styled(Tab)`
  margin: 0 5%;
`;

export function HomePage({ dispatch, loading, error, japs, pastJaps }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(loadJaps());
    dispatch(loadPastJaps());
  }, []);

  const handleJapClick = japId => {
    history.push(`/jap/${japId}`);
  };

  const japsListProps = {
    loading,
    error,
    items: japs,
    component: JapListItem,
    multiline: true,
    onClickItem: handleJapClick,
  };

  const pastJapsListProps = {
    loading,
    error,
    items: pastJaps,
    component: JapListItem,
    multiline: true,
    onClickItem: handleJapClick,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Fab />
      <StyledAppBar>
        <Tabs value={value} onChange={handleChange} centered>
          <StyledTab label="Prochains Japs" />
          <StyledTab label="Take me back" />
        </Tabs>
      </StyledAppBar>
      <SubPage value={value} index={0}>
        <ListWrapper {...japsListProps} />
      </SubPage>
      <SubPage value={value} index={1}>
        <ListWrapper {...pastJapsListProps} />
      </SubPage>
    </Wrapper>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  japs: PropTypes.array,
  pastJaps: PropTypes.array,
  error: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  japs: makeSelectJaps(),
  pastJaps: makeSelectPastJaps(),
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
