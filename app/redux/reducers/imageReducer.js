const initData = {
  isLoading: false,
};

const userReducer = (state = initData, {type, payload}) => {
  switch (type) {
    case 'IMAGE':
      return {
        isLoading: false,
      };
    case 'UPDATE_IMAGE':
      return {
        isLoading: true,
      };
    case 'UPDATE_IMAGESU':
      return {
        isLoading: false,
      };
    case 'UPDATE_IMAGERFAIL':
      return {
        ...state,
        isLoading: false,
        status: 400,
      };
    default:
      return state;
  }
};
export default userReducer;
