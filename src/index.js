import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc,
    connectFirestoreEmulator
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
} from 'firebase/auth'

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

//authentication services
const auth = getAuth()

// collection ref
const colRef = collection(db, 'paintings')

// queries
const q = query(colRef, orderBy('createdAt'))

onSnapshot(q, (snapshot) => {
    let paintings = []
    snapshot.docs.forEach((doc) => {
        paintings.push({ ...doc.data(), id: doc.id})
    })
    console.log(paintings)
})

// get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//       let paintings = []
//       snapshot.docs.forEach((doc) => {
//           paintings.push({ ...doc.data(), id: doc.id })
//       })
//       console.log(paintings)
//   })
//   .catch(err => {
//       console.log(err.message)
//   })

// real-time collection data
//   onSnapshot(colRef, (snapshot) => {
//       let paintings = []
//       snapshot.docs.forEach((doc) => {
//           paintings.push({ ...doc.data(), id: doc.id})
//       })
//       console.log(paintings)
//   })

  // adding documents
  const addPaintForm = document.querySelector('.add')
  addPaintForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
        artist: addPaintForm.artist.value,
        price: addPaintForm.price.value,
        type: addPaintForm.type.value,
        createdAt: serverTimestamp()
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

  // get a single document
  const docRef = doc(db, 'paintings', 'phFXoRlekCpRdeKOtHQd' )

  onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id)
  })

// get a single document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'paintings', updateForm.id.value)

    updateDoc(docRef, {
        price: 'updated price'
    })
    .then(() => {
        console.log('Document updated!')
    })
    .catch(() => {
        console.log('unsuccessful !')
    })
})

// signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created!', cred.user)
    })
    .catch((err) => {
        console.log(err.message)
    })

})

