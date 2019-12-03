/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import GlobalStyle from '../../global-styles';
import theme from '../../theme';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SwitchWrapper = styled.div`
  padding: 0 16px;
  flex: 1 1 auto;
  display: flex;
`;

export default function App() {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AppWrapper>
            <Helmet titleTemplate="%s - Go jap !" defaultTitle="Go jap !">
              <meta name="description" content="Go jap !" />
            </Helmet>
            <Header />
            <SwitchWrapper>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </SwitchWrapper>
            <Footer />
            <GlobalStyle />
          </AppWrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
