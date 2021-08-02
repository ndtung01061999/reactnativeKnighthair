import {fork, all, takeLatest} from 'redux-saga/effects';
import loginSaga from './loginSaga';
import userSaga from './userSaga';
import logoutSaga from './logoutSaga';
import imageSaga from './imageSaga';

const sagas = function* () {
  yield all([takeLatest('HANDLE_LOGIN', loginSaga)]);
  yield all([takeLatest('UPDATE_USER', userSaga)]);
  yield all([takeLatest('UPDATE_IMAGE', imageSaga)]);
  yield all([takeLatest('HANDLE_LOGOUT', logoutSaga)]);
};
export default sagas;
