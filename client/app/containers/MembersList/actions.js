/*
 *
 * MembersList actions
 *
 */

import {
  LOAD_MEMBERS,
  LOAD_MEMBERS_SUCCESS,
  LOAD_MEMBERS_ERROR,
} from './constants';

export function loadMembers() {
  return {
    type: LOAD_MEMBERS,
  };
}
export function membersLoaded(members) {
  return {
    type: LOAD_MEMBERS_SUCCESS,
    members: members.results,
  };
}

export function membersLoadingError(error) {
  return {
    type: LOAD_MEMBERS_ERROR,
    error,
  };
}
