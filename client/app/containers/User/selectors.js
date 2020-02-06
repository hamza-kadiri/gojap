import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the user state domain
 */

const selectUserDomain = state => state.user || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by User
 */

const makeSelectUser = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user
  );

const makeSelectUsername = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user.username
  );

const makeSelectUserId = () =>
  createSelector(
    selectUserDomain,
    substate => substate.user.id
  );

const makeSelectJapId = () =>
  createSelector(
    selectUserDomain,
    substate => substate.japId
  );

const makeSelectTableId = () =>
  createSelector(
    selectUserDomain,
    substate => substate.tableId
  );
const makeSelectIsEmperor = () =>
  createSelector(
    selectUserDomain,
    substate => substate.isEmperor
  );

export default makeSelectUser;
export {
  selectUserDomain,
  makeSelectUsername,
  makeSelectUserId,
  makeSelectJapId,
  makeSelectTableId,
  makeSelectIsEmperor,
};
