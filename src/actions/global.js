
export function actionOpenLoading(payload) {
  return {
    type: 'OPEN_LOADING',
    payload
  };
}

export function actionCloseLoading(payload) {
  return {
    type: 'CLOSE_LOADING'
  };
}

export function actionOpenSnackbar(payload) {
  return {
    type: 'OPEN_SNACKBAR',
    payload
  };
}

export function actionCloseSnackbar(payload) {
  return {
    type: 'CLOSE_SNACKBAR'
  };
}
