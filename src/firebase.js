import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCiMPwKoXLlYYHIZnGHgrov7229CLs0ZIE",
    authDomain: "wisehousecomed.firebaseapp.com",
    databaseURL: "https://wisehousecomed.firebaseio.com",
    projectId: "wisehousecomed",
    storageBucket: "wisehousecomed.appspot.com",
    messagingSenderId: "594564606504",
    appId: "1:594564606504:web:e227103f36dd480b"
  };
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
// export const fs = firebase.initializeApp(firebaseConfig);