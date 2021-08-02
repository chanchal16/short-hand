import React from 'react';
import firebase from 'firebase'
import 'firebase/firestore'

	  
    var firebaseConfig = {
        apiKey: "AIzaSyBV4YQ7aDs71SM0TyhQYnq61td9Y9bL24o",
        authDomain: "shorthand-1611.firebaseapp.com",
        databaseURL: "https://shorthand-1611.firebaseio.com",
        projectId: "shorthand-1611",
        storageBucket: "shorthand-1611.appspot.com",
        messagingSenderId: "79248051981",
        appId: "1:79248051981:web:6027795b32f4b23f482a44"
    };
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
    const firebaseApp = firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const _auth = firebase.auth();
    const timestamp= firebase.firestore.FieldValue.serverTimestamp()

    export  {db,firebaseApp,_auth,timestamp};