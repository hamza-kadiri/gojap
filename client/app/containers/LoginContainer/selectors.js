import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginContainer state domain
 */

const selectLoginContainerDomain = state =>
  state.loginContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginContainer
 */

const makeSelectLoginContainer = () =>
  createSelector(
    selectLoginContainerDomain,
    substate => substate
  );

const makeSelectLogin = () =>
  createSelector(
    selectLoginContainerDomain,
    substate => substate.login
  );

export default makeSelectLoginContainer;
export { selectLoginContainerDomain, makeSelectLogin };
