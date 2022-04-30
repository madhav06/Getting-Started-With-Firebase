import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
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
  const addPaintingForm = document.querySelector('.add')
  addPaintingForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
          artist: addPaintingForm.artist.value,
          price: addPaintingForm.price.value,
          type: addPaintingForm.type.value,
      }).then(() => {
          addPaintingForm.reset()
        })
  })

  // deleting documents
  const deletePaintingForm = document.querySelector('.delete')
  deletePaintingForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const docRef = doc(db, 'paintings', deletePaintingForm.id.value )
      deleteDoc(docRef).then(() => {
        deletePaintingForm.reset()
      })
  })