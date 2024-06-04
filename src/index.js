// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection,onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged } from "firebase/auth";
//import from javascript folder
import { renderReservation, removeReservation } from '../js/ui';

//sign up
const signupFormTrigger = document.getElementById('signup-form-trigger');
signupFormTrigger.addEventListener('click', () => {
  sideForm.classList.toggle('active');
});
const sideForm = document.getElementById('side-form');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAytTfGaL1XjFTgF_jDIHDGa_hMPQ-iLDw",
  authDomain: "cptr465-demo-2.firebaseapp.com",
  projectId: "cptr465-demo-2",
  storageBucket: "cptr465-demo-2.appspot.com",
  messagingSenderId: "289082882950",
  appId: "1:289082882950:web:ed512d99da25991c0d8a07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

//firestore collection reference 
const colRef = collection(db, 'Reservation')

//add reservation 
const form = document.querySelector('form');
form.addEventListener('submit', (evt)=>{
  evt.preventDefault()

  addDoc(colRef,{
    name: form.name.value,
    time: form.time.value,
    date: form.date.value
  })
  .then(()=> {
    form.name.value ='';
    form.time.value ='';
    form.date.value ='';
  })
})
 
// Realtime data collection
firebase.onSnapshot(colRef,(snapshot)=>{
  let reservations = [];
  snapshot.docs.forEach(doc => {
    reservations.push({ ...doc.data(), name: doc.data().name, time: doc.data().time, date: doc.data().date });
  });
  console.log(reservations);
});

onSnapshot(colRef, (snapshot)=> {
  snapshot.docChanges().forEach(change => {
    if(change.type === "added"){
      renderReservation(change.doc.data(), change.doc.name, change.doc.time, change.doc.date);
    }
    if(change.type === "removed"){
      removeReservation(change.doc.name);
    }
  })
})

//deleting docs
const reservationContainer = document.querySelector('.reservation')
 reservationContainer.addEventListener('click', (evt) => {
  evt.preventDefault()

    if(evt.target.textContent === 'delete'){
      const name = evt.target.getAttribute('data-id');
      const docRef = doc(db, 'Reservation', name)
      deleteDoc(docRef)
    }
 }) 

 //registration form 
 const signForm = document.querySelector('#signup-form');
 signForm.addEventListener('submit', (e) =>{
  e.preventDefault(); 
 //get user info
const email = signup['email'].value;
const password = signup['password'].value;
const confirmpass= signup['password'].value;

//sign up the user
createUserWithEmailAndPassword(auth, email, password)
.then(cred =>{
    //close and reset form 
    const sideForm= document.querySelector('#side-form');
        M.Sidenav.getInstance(sideForm).close();
        signup.reset();  
});
});

 //user login
const login = document.querySelector('#login-form');
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    //get user info
    const email =login['email'].value;
    const password =login['psw'.value];
    //log the user in 
    signInWithEmailAndPassword(auth, email, password).then(cred => {
        //reset form
        login.reset();
        window.location.href ='/page.html';
    });
})
