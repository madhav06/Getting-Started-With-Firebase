import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBz9YNK6fvd97fD-wmKAumTGtwFcPq_R80",
    authDomain: "fir-9-endgame.firebaseapp.com",
    projectId: "fir-9-endgame",
    storageBucket: "fir-9-endgame.appspot.com",
    messagingSenderId: "496453604155",
    appId: "1:496453604155:web:7e9f7fc8df2ab531891d1e"
  };

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'paintings')

// get collection data
