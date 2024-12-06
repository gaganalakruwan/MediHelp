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
// import {customerType} from '../../type';

type TSaga = {
  payload: {
    success?: Function;
    failed?: Function;
  };
};
export function* getImages({payload: {success, failed}}:TSaga) {
  try {
    const {data} = yield call(Api.getAllmages);

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
export function* getUsers({payload: {success, failed}}:TSaga) {
  try {
    const {data} = yield call(Api.getAllUsers);

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
export function* getPosts({payload: {success, failed}}:TSaga) {
  try {
    const {data} = yield call(Api.getAllPosts);

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
export function* getComments({payload: {success, failed}}:TSaga) {
  try {
    const {data} = yield call(Api.userAuth);

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
  yield takeLatest(CommonTypes.USER_LOGIN, getImages);
}
