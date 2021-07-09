const initData = {
  name: 'Ha van duc',
  age: 24,
};

const todoReducer = (state = initData, {type, payload}) => {
  switch (type) {
    case 'TEST':
      return state;
    default:
      return state;
  }
};
export default todoReducer;
