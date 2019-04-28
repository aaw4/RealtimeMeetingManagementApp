import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


// Initialize Firebase
const config = {
    apiKey: "AIzaSyAotHTKse4FoQ0_q0_c_V4hc61YlOXeFIk",
    authDomain: "onlinemeetingmaster.firebaseapp.com",
    databaseURL: "https://onlinemeetingmaster.firebaseio.com",
    projectId: "onlinemeetingmaster",
    storageBucket: "onlinemeetingmaster.appspot.com",
    messagingSenderId: "987945468791"
  };
  firebase.initializeApp(config);

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();

  export default firebase;
