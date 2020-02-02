import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addTablePage state domain
 */

const selectAddTablePageDomain = state => state.addTablePage || initialState;
const globalDomain = state => state;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddTablePage
 */

const makeSelectAddTablePage = () =>
  createSelector(
    selectAddTablePageDomain,
    substate => substate
  );

const makeSelectMembers = () =>
  createSelector(
    globalDomain,
    globalState => globalState.membersList.members
  );

export default makeSelectAddTablePage;
export { selectAddTablePageDomain, makeSelectMembers };
