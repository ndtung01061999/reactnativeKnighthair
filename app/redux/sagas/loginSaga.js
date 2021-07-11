import {call, put} from 'redux-saga/effects';
import User from '../../api/user/User';
import Customer from '../../api/customer/Customer';
import navigationRef from '../../navigations/navigationRef';
function* postLoginAction(body) {
  try {
    console.log(body);
    let response = yield call(User.login, body);
    if (response.data.id != 0) {
      let res = yield call(Customer.getCustomer, response.data.id);
      yield put({type: 'USER', payload: res.data});
      yield put({type: 'LOGIN_SUCCESS', payload: response.data});
      yield navigationRef.navigate('Tabs');
    } else {
      yield put({type: 'LOGIN_FAILURE'});
      alert('Sai tên hoặc mật khẩu');
    }
  } catch (err) {
    console.log('err  ------------->', err);
    yield put({type: 'LOGIN_FAILURE', err});
  }
}

export default function* (action) {
  yield call(postLoginAction, action);
}
