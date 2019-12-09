import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ordersList state domain
 */

const selectOrdersListDomain = state => state.ordersList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrdersList
 */

const makeSelectOrdersList = () =>
  createSelector(
    selectOrdersListDomain,
    substate => substate
  );

export default makeSelectOrdersList;
export { selectOrdersListDomain };
