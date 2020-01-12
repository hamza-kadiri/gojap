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
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'containers/Header';
import Footer from 'components/Footer';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import routes from 'utils/routes';
import GlobalStyle from '../../global-styles';
import theme from '../../theme';
import { makeSelectLocation } from './selectors';
import { toggleRecap } from '../OrderScreen/actions';

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
  const currentKey = router.pathname.split('/')[1] || '/';
  const handleOpenDrawer = () => {
    switch (currentKey) {
      case 'order':
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
                {routes.map(({ path, Component }) => (
                  <Route key={path} exact path={path} component={Component} />
                ))}
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
  dispatch: PropTypes.func,
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
