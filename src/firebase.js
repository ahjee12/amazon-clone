import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDWH0oa0IBPZzmPtavvyaSt_YN_P3QsAc0",
    authDomain: "clone-3cea9.firebaseapp.com",
    projectId: "clone-3cea9",
    storageBucket: "clone-3cea9.appspot.com",
    messagingSenderId: "632027580577",
    appId: "1:632027580577:web:4931b070552246c12bc8e0",
    measurementId: "G-MBND7P98Q8"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db, auth}
