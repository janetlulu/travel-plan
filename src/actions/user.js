import firebase from '../firebase';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_SIGNOUT } from '../constants/actionTypes'

export function actionUserLoginRequest(payload) {
  return {
    type: USER_LOGIN_REQUEST
  };
}

export function actionUserLoginSuccess(payload) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload
  };
}

export function actionUserLoginError(payload) {
  return {
    type: USER_LOGIN_ERROR,
    payload,
    snackbar: {
      message: "登入失敗:" + payload.message
    }
  };
}

export function actionUserSignOut() {
  return {
    type: USER_SIGNOUT
  };
}

export const userGetAuth = () => {
  return async dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, email } = user;
        const name = displayName || email;
        const data = { uid, name, isLogin: true };
        dispatch(actionUserLoginSuccess(data));
      }
    });
  };
};

export const userLogin = (email, password) => {
  return async dispatch => {
    const payload = {
      types: ['USER_LOGIN_REQUEST', 'USER_LOGIN_SUCCESS', 'USER_LOGIN_ERROR'],
      promise: firebase.auth().signInWithEmailAndPassword(email, password),
      onSuccess: actionUserLoginSuccess,
      onError: actionUserLoginError
    };
    dispatch(payload);
  };
};

export const userCreateByEmail = (email, password) => {
  return async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      alert('帳號已建立');
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case 'auth/weak-password':
          alert('帳號或密碼錯誤');
          break;
        case 'auth/email-already-in-use':
          alert('email 已存在');
          break;
        default:
          alert(errorCode, errorMessage);
      }
    }
  };
};


// export const userLogin = (email, password) => {
//   return async dispatch => {
//     try {
//       await firebase.auth().signInWithEmailAndPassword(email, password);
//       alert('login ok');
//       dispatch(userGetAuth());
//     } catch (error) {
//       let errorCode = error.code;
//       let errorMessage = error.message;
//       switch (errorCode) {
//         case 'auth/user-not-found':
//           alert('帳號不存在');
//           break;
//         case 'auth/wrong-password':
//           alert('帳號或密碼錯誤');
//           break;
//         default:
//           alert(errorCode, errorMessage);
//       }
//     }
//   };
// };

export const userLoginSocial = provider => {
  return async dispatch => {
    try {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      await firebase.auth().signInWithPopup(authProvider);
      dispatch(userGetAuth());
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };
};

export const userSignOut = () => {
  return async dispatch => {
    try {
      firebase.auth().signOut();
      dispatch(actionUserSignOut());
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };
};
