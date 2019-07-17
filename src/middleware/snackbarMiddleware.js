import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../constants/actionTypes';
import isEmpty from 'lodash/isEmpty';

export const snackbarMiddleware = store => next => action => {
  if (!isEmpty(action.snackbar)) {
    next({ type: OPEN_SNACKBAR, payload: action.snackbar });
  } else {
    next({ type: CLOSE_SNACKBAR });
  }

  return next(action);
};