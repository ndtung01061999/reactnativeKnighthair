import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
  loginReducer: loginReducer,
  userReducer: userReducer,
  logoutReducer: loginReducer,
});
export default rootReducer;
