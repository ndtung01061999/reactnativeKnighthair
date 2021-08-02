import {call, put} from 'redux-saga/effects';
import Customer from '../../api/customer/Customer';
import navigationRef from '../../navigations/navigationRef';
function* postImageAction(body) {
  try {
    console.log(body);
    let response = yield call(Customer.updateImage, body.payload);
    if (response?.status == 200) {
      yield put({
        type: 'UPDATE_USERSUSSCED',
        payload: body.payload.users,
      });
      yield put({type: 'UPDATE_IMAGESU'});
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
  yield call(postImageAction, action);
}
