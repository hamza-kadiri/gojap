import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const selectUser = state => state.user;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location
  );

const makeSelectUser = () =>
  createSelector(
    selectUser,
    routerState => routerState.user
  );
export { makeSelectLocation, makeSelectUser };
