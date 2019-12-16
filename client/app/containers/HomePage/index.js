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
import saga from './saga';
import JapListItem from 'components/JapListItem';
import ListWrapper from 'components/ListWrapper';
import styled from 'styled-components';
import H1 from 'components/H1';
import reducer from './reducer';

import AppBar from '@material-ui/core/AppBar';
import SubPage from 'components/SubPage';

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

const StyledAppBar = styled(({ ...rest }) => <AppBar {...rest} />)`
  position: static;
`;

const StyledTab = styled(({ ...rest }) => <Tab {...rest} />)`
  margin: 0 5%;
`;

export function HomePage({ dispatch, loading, error, japs }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const [value, setValue] = React.useState(0);

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
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <StyledTab label="Prochains Japs" />
          <StyledTab label="Take me back" />
        </Tabs>
      </StyledAppBar>
      <SubPage value={value} index={0}>
          <ListWrapper {...japsListProps} />
      </SubPage>
      <SubPage value={value} index={1}>
        Take me Back
      </SubPage>
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
