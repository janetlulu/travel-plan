const initState = {
  uid: '',
  name: ''
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return state;
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload
      };
    case 'USER_LOGIN_ERROR':
      return state;
    case 'USER_SING_OUT': {
      return initState;
    }
    default:
      return state;
  }
};

export default user;
