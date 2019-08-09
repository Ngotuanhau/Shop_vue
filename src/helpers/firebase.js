import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJCrA9nNbsn_9yFYXmUmop8xzGjUQfb8A",
    authDomain: "shop-2b7f7.firebaseapp.com",
    databaseURL: "https://shop-2b7f7.firebaseio.com",
    projectId: "shop-2b7f7",
    storageBucket: "",
    messagingSenderId: "94111151072",
    appId: "1:94111151072:web:2af09fec3cfd4552"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
};