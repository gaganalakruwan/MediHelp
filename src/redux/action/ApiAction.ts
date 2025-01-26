import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  authLogin: ['payload'],
  getItCategory: ['payload'],
  getItGroup: ['payload'],
  getItType: ['payload'],
  insertMonthPlan: ['payload'],
  getFeedback: ['payload'],
  getLocation: ['payload'],
  refreshToken: ['payload'],
  getAllMonthlyPlans: ['payload'],
  editPlan: ['payload'],
  deletePlan: ['payload'],
  addFeedback: ['payload'],
});
export const CommonTypes = Types;
export const CommonActions = Creators;

import {
  SET_TOKEN,
  SET_USER_DATA,
  SET_USER_ID,
  LOGOUT,
} from 'constant/reduxConstants';

export const setUserData = (data: any) => ({
  type: SET_USER_DATA,
  payload: data,
});

export const setToken = (data: any) => ({
  type: SET_TOKEN,
  payload: data,
});
export const setUserId = (data: any) => ({
  type: SET_USER_ID,
  payload: data,
});
export const logout = () => ({
  type: LOGOUT,
});
