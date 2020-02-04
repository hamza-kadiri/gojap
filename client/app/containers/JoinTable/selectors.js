import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the joinTable state domain
 */

const selectJoinTableDomain = state => state.joinTable || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by JoinTable
 */

const makeSelectJoinTable = () =>
  createSelector(
    selectJoinTableDomain,
    substate => substate
  );


const makeSelectTables = () =>
  createSelector(
    selectJoinTableDomain,
    substate => substate.tables
  );
export default makeSelectJoinTable;
export { selectJoinTableDomain, makeSelectTables };
