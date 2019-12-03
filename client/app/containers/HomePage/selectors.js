import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.loading
  );

const makeSelectError = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.error
  );

const makeSelectJaps = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.japs
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectJaps,
};
