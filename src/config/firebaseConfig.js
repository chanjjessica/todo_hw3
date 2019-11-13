import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAb9RioticV0EfITt8I9AigGCGZ_AXu3Gk",
    authDomain: "todo-316-jejchan.firebaseapp.com",
    databaseURL: "https://todo-316-jejchan.firebaseio.com",
    projectId: "todo-316-jejchan",
    storageBucket: "todo-316-jejchan.appspot.com",
    messagingSenderId: "834952666784",
    appId: "1:834952666784:web:da139020277f7ce22873c5",
    measurementId: "G-JS0Q2K70ZT"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;