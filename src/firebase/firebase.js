import firebase from 'firebase';
import Rebase from 're-base'
const config = {
    apiKey: "AIzaSyBhrNK8N4gnl2Qfxp3rq1PPmakPQlvHgsk",
    authDomain: "laroutesdesvins.firebaseapp.com",
    databaseURL: "https://laroutesdesvins.firebaseio.com",
    projectId: "laroutesdesvins",
    storageBucket: "laroutesdesvins.appspot.com",
    messagingSenderId: "143033563385"
};

const app = firebase.initializeApp(config);
const auth = firebase.auth();
const base = Rebase.createClass(app.database())
const storageRef = firebase.storage().ref()

export { auth, base, storageRef };
