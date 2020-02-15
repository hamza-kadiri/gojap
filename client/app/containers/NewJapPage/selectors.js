import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newJapPage state domain
 */

const selectNewJapPageDomain = state => state.newJapPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewJapPage
 */

const makeSelectNewJapPage = () =>
  createSelector(
    selectNewJapPageDomain,
    substate => substate
  );

const makeSelectJapPlaces = () =>
  createSelector(
    selectNewJapPageDomain,
    substate => substate.japPlaces
  );

const makeSelectLoading = () =>
  createSelector(
    selectNewJapPageDomain,
    substate => substate.loading
  );

export default makeSelectNewJapPage;
export { selectNewJapPageDomain, makeSelectJapPlaces, makeSelectLoading };
