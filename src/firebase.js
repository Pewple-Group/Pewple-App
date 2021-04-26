import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDq7kJMRVxRIvma95ImQyl0PeSZysQ7DH4",
  authDomain: "pewple-app.firebaseapp.com",
  projectId: "pewple-app",
  storageBucket: "pewple-app.appspot.com",
  messagingSenderId: "810574812798",
  appId: "1:810574812798:web:5cb88569801d0c673bea2f",
  measurementId: "G-KK8LB4YQHX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
const GithubProvider = new firebase.auth.GithubAuthProvider();

export { auth, GoogleProvider, GithubProvider };
export default db;
