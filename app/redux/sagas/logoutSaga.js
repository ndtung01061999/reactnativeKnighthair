import {call, put} from 'redux-saga/effects';
import User from '../../api/user/User';
import Customer from '../../api/customer/Customer';
import navigationRef from '../../navigations/navigationRef';
function* postLogoutAction(body) {
  try {
    yield put({type: 'LOGOUT_SUCCESS'});
    yield navigationRef.navigate('Login');
  } catch (err) {
    console.log('err  ------------->', err);
    yield put({type: 'LOGIN_FAILURE', err});
  }
}

export default function* (action) {
  yield call(postLogoutAction, action);
}
