import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc, ref, remove
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
getDocs(colRef)
  .then((snapshot) => {
      let paintings = []
      snapshot.docs.forEach((doc) => {
          paintings.push({ ...doc.data(), id: doc.id })
      })
      console.log(paintings)
  })
  .catch(err => {
      console.log(err.message)
  })

  // adding documents
  const addPaintForm = document.querySelector('.add')
  addPaintForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
        artist: addPaintForm.artist.value,
        price: addPaintForm.price.value,
        type: addPaintForm.type.value
      })
      .then(() => {
          console.log('Document added!')
      })
      .catch(() => {
          console.log('unsuccessful !')
      })
      
  })

  // deleting documents
  const deletePaintForm = document.querySelector('.delete')
  deletePaintForm.addEventListener('submit', (e) => {
      e.preventDefault()

      
      const docRef = doc(db, 'paintings', deletePaintForm.id.value)

      deleteDoc(docRef)
      .then(() => {
          console.log('Document deleted!')
      })
      .catch(() => {
          console.log('unsuccessful !')
      })
  })

