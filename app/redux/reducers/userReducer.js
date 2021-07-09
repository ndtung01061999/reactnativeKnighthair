const initData = {
  users: {},
};

const userReducer = (state = initData, {type, payload}) => {
  switch (type) {
    case 'USER':
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: payload,
        isLoading: false,
      };
    case 'UPDATE_USERSUSSCED':

      return {
        ...state,
        users: payload,
        isLoading: false,
        status: 200,
      };
    case 'UPDATE_USERFAIL':
      return {
        ...state,
        users: payload,
        isLoading: false,
        status: 400,
      };
    default:
      return state;
  }
};
export default userReducer;
