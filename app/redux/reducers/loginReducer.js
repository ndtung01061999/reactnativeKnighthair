const initData = {
  id: 0,
  name: '',
  password: '',
  type: 0,
  isLoading: false,
  error: '',
};

const loginReducer = (state = initData, {type, payload}) => {
  switch (type) {
    case 'HANDLE_LOGIN':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        id: payload?.id,
        name: payload?.name,
        password: payload?.password,
        type: payload?.type,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: 'Login fail',
      };
    default:
      return state;
  }
};
export default loginReducer;
