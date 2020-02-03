/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from 'containers/User/reducer';
import { persistReducer } from 'redux-persist';
import history from 'utils/history';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
};

const injectedReducerPersistConfig = injectedReducers => {
  const persistedReducers = { ...injectedReducers };
  const keys = Object.keys(injectedReducers);
  const persistedReducerKeys = ['japScreen', 'orderScreen'];
  keys.forEach(key => {
    if (persistedReducerKeys.includes(key)) {
      persistedReducers[key] = persistReducer(
        { key, storage },
        injectedReducers[key]
      );
    }
  });
  return persistedReducers;
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const persistedReducers = injectedReducerPersistConfig(injectedReducers);
  const rootReducer = combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    ...persistedReducers,
  });
  return rootReducer;
}
