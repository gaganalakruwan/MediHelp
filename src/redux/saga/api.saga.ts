import {
  put,
  takeEvery,
  call,
  all,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import Api from 'services/apiService';
import {CommonTypes} from '../action/ApiAction';
import {SET_TOKEN, SET_USER_DATA} from 'constant/reduxConstants';

type TSaga = {
  payload: {
    success?: Function;
    failed?: Function;
    params?: any;
  };
};
export function* authLogin({payload: {success, failed, params}}: TSaga) {
  try {
    const {data} = yield call(Api.userAuth, params);

    if (data) {
      // Save user data before calling success callback
      yield put({type: SET_TOKEN, payload: data.access_token});
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getItCategory({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getItCategory);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getItGroup({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getItGroup);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getItType({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getItType);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* insertMonthPlan({payload: {success, failed, params}}: TSaga) {
  try {
    const {data} = yield call(Api.insertMonthPlan, params);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getFeedback({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getFeedback);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* refreshToken({payload: {success, failed, params}}: TSaga) {
  try {
    const {data} = yield call(Api.refreshToken, params);
    if (data) {
      yield put({type: SET_TOKEN, payload: data.access_token});
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getAllMonthlyPlans({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getNextMonthPlan);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* editPlan({payload: {success, failed,params}}: TSaga) {
  try {
    const {data} = yield call(Api.editPlan,params);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* deletePlan({payload: {success, failed,params}}: TSaga) {
  try {
    const {data} = yield call(Api.deletePlan,params);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* addFeedback({payload: {success, failed,params}}: TSaga) {
  try {
    const {data} = yield call(Api.sendFeedback,params);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}
export function* getLocation({payload: {success, failed}}: TSaga) {
  try {
    const {data} = yield call(Api.getItLocation);
    if (data) {
      success?.(data);
    } else {
      throw new Error('No data returned from API');
    }
  } catch (error) {
    failed?.(error);
    console.log('Error in userLogin saga:', error);
  }
}

export function* apiSaga() {
  yield takeLatest(CommonTypes.AUTH_LOGIN, authLogin);
  yield takeLatest(CommonTypes.GET_IT_CATEGORY, getItCategory);
  yield takeLatest(CommonTypes.GET_IT_GROUP, getItGroup);
  yield takeLatest(CommonTypes.GET_IT_TYPE, getItType);
  yield takeLatest(CommonTypes.INSERT_MONTH_PLAN, insertMonthPlan);
  yield takeLatest(CommonTypes.GET_FEEDBACK, getFeedback);
  yield takeLatest(CommonTypes.GET_LOCATION, getLocation);
  yield takeLatest(CommonTypes.REFRESH_TOKEN, refreshToken);
  yield takeLatest(CommonTypes.GET_ALL_MONTHLY_PLANS, getAllMonthlyPlans);
  yield takeLatest(CommonTypes.EDIT_PLAN, editPlan);
  yield takeLatest(CommonTypes.DELETE_PLAN, deletePlan);
  yield takeLatest(CommonTypes.ADD_FEEDBACK, addFeedback);
}
