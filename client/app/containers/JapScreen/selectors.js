import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the japScreen state domain
 */

const selectJapScreenDomain = state => state.japScreen || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JapScreen
 */

const makeSelectJapScreen = () =>
  createSelector(
    selectJapScreenDomain,
    substate => substate
  );

const makeSelectJap = () =>
  createSelector(
    selectJapScreenDomain,
    substate => substate.jap
  );

const makeSelectTable = () =>
  createSelector(
    selectJapScreenDomain,
    substate => substate.table
  );
export default makeSelectJapScreen;
export { selectJapScreenDomain, makeSelectJap, makeSelectTable };
