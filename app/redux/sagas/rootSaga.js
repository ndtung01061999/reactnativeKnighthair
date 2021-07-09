import {fork, all, takeLatest} from 'redux-saga/effects';
import loginSaga from './loginSaga';
import userSaga from './userSaga';

const sagas = function* () {
  yield all([takeLatest('HANDLE_LOGIN', loginSaga)]);
  yield all([takeLatest('UPDATE_USER', userSaga)]);
};
export default sagas;
