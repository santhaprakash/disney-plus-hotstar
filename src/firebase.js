import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCeFd6bXYn8RDgTG3QNlW7XZe4UrxKzKAY",
  authDomain: "disney-plus-65bff.firebaseapp.com",
  projectId: "disney-plus-65bff",
  storageBucket: "disney-plus-65bff.appspot.com",
  messagingSenderId: "636836310187",
  appId: "1:636836310187:web:b9c82dd2ea3aa02055dbee"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;