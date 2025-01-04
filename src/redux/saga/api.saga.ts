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
import {SET_USER_DATA} from 'constant/reduxConstants';

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
      let SaveData = {
        access_token: data.access_token,
      };

      // Save user data before calling success callback
      yield put({type: SET_USER_DATA, payload: SaveData});
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
}
