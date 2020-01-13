import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the membersList state domain
 */

const selectMembersListDomain = state => state.membersList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MembersList
 */

const makeSelectMembersList = () =>
  createSelector(
    selectMembersListDomain,
    substate => substate
  );

const makeSelectMembers = () =>
  createSelector(
    selectMembersListDomain,
    globalState => globalState.members
  );

export default makeSelectMembersList;
export { selectMembersListDomain, makeSelectMembers };
