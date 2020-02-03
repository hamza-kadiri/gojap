import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addMembersPage state domain
 */

const selectAddMembersPageDomain = state =>
  state.addMembersPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddMembersPage
 */

const makeSelectAddMembersPage = () =>
  createSelector(
    selectAddMembersPageDomain,
    substate => substate
  );

const makeSelectUsers = () =>
  createSelector(
    selectAddMembersPageDomain,
    substate => substate.users && substate.users.users
  );

export default makeSelectAddMembersPage;
export { selectAddMembersPageDomain, makeSelectUsers };
