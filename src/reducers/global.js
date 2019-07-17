const initState = {
  isLoading: false,
  errorMsg: ''
};

const global = (state = initState, action) => {
  switch (action.type) {
    case 'OPEN_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'CLOSE_LOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'OPEN_SNACKBAR':
      return {
        ...state,
        errorMsg: action.payload
      };
    case 'CLOSE_SNACKBAR': {
      return {
        ...state,
        errorMsg: ''
      };
    }
    default:
      return state;
  }
};

export default global;
