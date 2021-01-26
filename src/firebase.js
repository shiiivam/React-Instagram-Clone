import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCAt2FMlM-3ekxbwtRAvGVtAb2QtqxX2AA",
    authDomain: "instagram-clone-react-81c2a.firebaseapp.com",
    projectId: "instagram-clone-react-81c2a",
    storageBucket: "instagram-clone-react-81c2a.appspot.com",
    messagingSenderId: "809899191367",
    appId: "1:809899191367:web:c8f0d1997b5de520229562",
    measurementId: "G-NS1L22HXTN"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};