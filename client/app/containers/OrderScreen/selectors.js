import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the OrderScreen state domain
 */

const selectOrderScreenDomain = state => state.orderScreen || initialState;
const selectOrderDomain = state =>
  (state.orderScreen && state.orderScreen.order) || initialState.order;
const selectRecapDomain = state =>
  (state.orderScreen && state.orderScreen.recap) || initialState.recap;
const selectOrdersListDomain = state =>
  (state.orderScreen && state.orderScreen.ordersList) ||
  initialState.ordersList;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderScreen
 */

const makeSelectOrderScreen = () =>
  createSelector(
    selectOrderScreenDomain,
    substate => substate.order
  );

const makeSelectRecapOpen = () =>
  createSelector(
    selectRecapDomain,
    substate => substate.recapOpen
  );

const makeSelectCurrentItem = () =>
  createSelector(
    selectOrderDomain,
    substate => substate.currentItem
  );
const makeSelectCurrentCommandId = () =>
  createSelector(
    selectOrderDomain,
    substate => substate.currentCommandId
  );
const makeSelectOrdersList = () =>
  createSelector(
    selectOrdersListDomain,
    substate => substate
  );

export default makeSelectOrderScreen;
export {
  selectOrderScreenDomain,
  makeSelectRecapOpen,
  makeSelectCurrentItem,
  makeSelectOrdersList,
  makeSelectCurrentCommandId,
};
