import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the header state domain
 */

const selectHeaderDomain = state => state.header || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Header
 */

const makeSelectHeader = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate
  );

const makeSelectCurrentKey = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate.currentKey
  );

const makeSelectTitle = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate.title
  );
const makeSelectMoreMenu = () =>
  createSelector(
    selectHeaderDomain,
    substate => substate.moreMenu
  );

export default makeSelectHeader;
export {
  selectHeaderDomain,
  makeSelectCurrentKey,
  makeSelectTitle,
  makeSelectMoreMenu,
};
