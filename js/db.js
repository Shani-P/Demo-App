// firestore collection reference 
const colRef = collection(db, 'Reservation')

///add reservation 
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
const reservationContainer = document.querySelector('.reservations')
 reservationContainer.addEventListener('click', (evt) => {
  evt.preventDefault()

    if(evt.target.textContent === 'delete'){
      const id = evt.target.getAttribute('data-id');
      const docRef = doc(db, 'Reservation', id)
      deleteDoc(docRef)
    }
 }) 