import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addTablePage state domain
 */

const selectAddTablePageDomain = state => state.addTablePage || initialState;

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

export default makeSelectAddTablePage;
export { selectAddTablePageDomain };
