/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import HomePage from 'containers/HomePage/Loadable';
import NewJapPage from 'containers/NewJapPage';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import JapScreen from 'containers/JapScreen';
import { connect } from 'react-redux';
import SocketTest from 'containers/SocketTest';
import GlobalStyle from '../../global-styles';
import theme from '../../theme';
import { makeSelectLocation } from './selectors';
import OrdersList from '../OrdersList';
import { toggleRecap } from '../JapScreen/actions';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SwitchWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
`;

function App({ router, dispatch }) {
  const handleOpenDrawer = () => {
    switch (router.pathname) {
      case '/jap':
        return () => dispatch(toggleRecap(true));
      default:
        return null;
    }
  };
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet titleTemplate="%s - Go jap !" defaultTitle="Go jap !">
              <meta name="description" content="Go jap !" />
            </Helmet>
            <Header handleOpenDrawer={handleOpenDrawer} />
            <SwitchWrapper>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/socket" component={SocketTest} />
                <Route exact path="/jap" component={JapScreen} />
                <Route exact path="/orders" component={OrdersList} />
                <Route exact path="/newjap" component={NewJapPage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </SwitchWrapper>
            {['/', '/dashboard', '/profile'].includes(router.pathname) && (
              <Footer />
            )}
            <GlobalStyle />
          </AppWrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

App.propTypes = {
  router: PropTypes.object,
};
const mapStateToProps = createStructuredSelector({
  router: makeSelectLocation(),
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

export default compose(withConnect)(App);
