import firebase from './firebase';

export function actionUserLogin(user) {
  return {
    type: 'USER_LOGIN',
    user
  };
}

export function actionUserSignOut() {
  return {
    type: 'USER_SING_OUT'
  };
}

export const userGetAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const { uid, displayName, email } = user;
      const name = displayName || email;
      const data = { uid, name };
      dispatch(actionUserLogin(data));
    }
  });
};

export const userCreateByEmail = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert('帳號已建立');
    userGetAuth();
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

export const userLogin = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      alert('login ok');
      userGetAuth();
    } catch (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      switch (errorCode) {
        case 'auth/user-not-found':
          alert('帳號不存在');
          break;
        case 'auth/wrong-password':
          alert('帳號或密碼錯誤');
          break;
        default:
          alert(errorCode, errorMessage);
      }
    }
  };
};

export const userLoginSocial = async provider => {
  try {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    await firebase.auth().signInWithPopup(authProvider);
    userGetAuth();
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorCode, errorMessage);
  }
};

export const userSignOut = () => async dispatch => {
  try {
    firebase.auth().signOut();
    dispatch(actionUserSignOut());
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorCode, errorMessage);
  }
};
