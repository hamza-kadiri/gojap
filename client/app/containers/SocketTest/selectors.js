import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the socketTest state domain
 */

const selectSocketTestDomain = state => state.socketTest || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SocketTest
 */

const makeSelectSocketTest = () =>
  createSelector(
    selectSocketTestDomain,
    substate => substate
  );

export default makeSelectSocketTest;
export { selectSocketTestDomain };
