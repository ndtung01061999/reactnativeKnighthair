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
    case 'HANDLE_LOGOUT':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        id: 0,
        name: '',
        password: '',
        type: 0,
        isLoading: false,
      };
    case 'LOGOUT_FAILURE':
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
