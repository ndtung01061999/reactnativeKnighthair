import {call, put, select} from 'redux-saga/effects';
import Customer from '../../api/customer/Customer';
import navigationRef from '../../navigations/navigationRef';
function* postUserAction(body) {
  try {
    let response = yield call(Customer.updateCustomer, body.payload);
    if (response?.status == 200) {
      yield put({type: 'UPDATE_USERSUSSCED', payload: body.payload});
      yield navigationRef.navigate('UserScreen');
      alert('Thanh cong');
    } else {
      yield put({type: 'UPDATE_USERFAIL'});
    }
  } catch (err) {
    console.log('err  ------------->', err);
    yield put({type: 'UPDATE_USERFAIL'});
  }
}

export default function* (action) {
  yield call(postUserAction, action);
}
