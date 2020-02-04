import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectJapScreenDomain } from '../JapScreen/selectors';

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

const makeSelectOrders = () =>
  createSelector(
    selectOrdersListDomain,
    globalState => globalState.orders
  );

const makeSelectJapPlaceId = () =>
  createSelector(
    selectJapScreenDomain,
    globalState => (globalState.jap && globalState.jap.jap_place_id) || 3
  );

export default makeSelectOrdersList;
export { selectOrdersListDomain, makeSelectOrders, makeSelectJapPlaceId };
