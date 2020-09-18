import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC5RYy8u003cSjrYDfMoHmNKPwJ02AxDeA",
    authDomain: "whatsapp-clone-d0426.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-d0426.firebaseio.com",
    projectId: "whatsapp-clone-d0426",
    storageBucket: "whatsapp-clone-d0426.appspot.com",
    messagingSenderId: "361789577790",
    appId: "1:361789577790:web:8bdca0c0a38e764072cf6f"
})

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export { auth, provider };