const initState = {
  uid: '',
  name: ''
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        ...action.value
      };
    case 'USER_SING_OUT': {
      return initState;
    }
    default:
      return state;
  }
};

export default user;
