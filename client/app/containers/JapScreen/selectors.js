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
export default makeSelectJapScreen;
export { selectJapScreenDomain, makeSelectJap };
