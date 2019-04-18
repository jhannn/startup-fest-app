import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyABovsmOm2cdNVS3Kp8kSZs3fdNhE6Z-rg",
    authDomain: "desafionovolab-44b50.firebaseapp.com",
    databaseURL: "https://desafionovolab-44b50.firebaseio.com",
    projectId: "desafionovolab-44b50",
    storageBucket: "desafionovolab-44b50.appspot.com",
    messagingSenderId: "610461847349"
};
let app = Firebase.initializeApp(config);
export const db = app.database();