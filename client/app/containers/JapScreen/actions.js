/*
 *
 * JapScreen actions
 *
 */

import { TOGGLE_RECAP } from './constants';

export function toggleRecap(boolean) {
  return {
    type: TOGGLE_RECAP,
    payload: boolean,
  };
}
