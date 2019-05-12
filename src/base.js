// import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCIpdGXO_YDWExaSS16_pX7-6Ooe2-UgK0",
  authDomain: "travel-plan-f05d1.firebaseapp.com",
  databaseURL: "https://travel-plan-f05d1.firebaseio.com",
  projectId: "travel-plan-f05d1",
  storageBucket: "travel-plan-f05d1.appspot.com",
  messagingSenderId: "1055376360468",
  appId: "1:1055376360468:web:8055249da726af79"
});

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
        alert("login ok");
        cb();
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            alert("帳號不存在");
            break;
          case "auth/wrong-password":
            alert("帳號或密碼錯誤");
            break;
          default:
            alert(errorCode, errorMessage);
        }
        console.log("signIn error:", error);
      });
  },

  loginSocial(provider, cb) {
    console.log("loginSocial", provider);
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
        alert("帳號已建立");
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        switch (errorCode) {
          case "auth/weak-password":
            alert("帳號或密碼錯誤");
            break;
          case "auth/email-already-in-use":
            alert("email 已存在");
            break;
          default:
            alert(errorCode, errorMessage);
        }
        console.log("createUser error:", error);
      });
  },

  signOut() {
    firebase.auth().signOut();
  }
};
