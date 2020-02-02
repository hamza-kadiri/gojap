import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the japScreen state domain
 */

const selectJapScreenDomain = state => state.japScreen || initialState;
const globalDomain = state => state;

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

export default makeSelectJapScreen;
export { selectJapScreenDomain };
