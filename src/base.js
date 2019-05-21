import firebase from 'firebase';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID
} = process.env;

const firebaseApp = firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
});

export const firebaseApp1 = firebaseApp;

export const auth = {
  getAuth(cb) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        cb({ user });
      }
    });
  },

  login(email, password, cb) {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('login ok');
        cb();
      })
      .catch(error => {
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
      });
  },

  loginSocial(provider, cb) {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(cb)
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  },

  createUserByEmail(email, password) {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('帳號已建立');
      })
      .catch(error => {
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
      });
  },

  signOut() {
    firebase.auth().signOut();
  }
};
