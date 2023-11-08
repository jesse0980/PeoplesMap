import logo from './logo.svg';
import './App.css';
import Map from "./components/map.js"
import SignIn from "./components/signIn.js"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Input from "./components/input.js"
import {Marker} from "@react-google-maps/api"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React from 'react';

firebase.initializeApp({
  apiKey: "AIzaSyBlUmi6t_l8cFRUEFRGH-YBYZzkfjaDjM0",
  authDomain: "swamp-6a0dd.firebaseapp.com",
  projectId: "swamp-6a0dd",
  storageBucket: "swamp-6a0dd.appspot.com",
  messagingSenderId: "488870202565",
  appId: "1:488870202565:web:ece218b8eb66822b40f4ac",
  measurementId: "G-PF4P6HYDWB"
})
const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {
  const [user] = useAuthState(auth);
  const placesRef = firestore.collection('places')
  const query = placesRef.orderBy('createdAt').limit(25)
  const [places] = useCollectionData(query, {idField:'id'});
  window.setTimeout(() => {
  }, 2000);

    
    console.log(places)

//     const plArr = async =>{
//       await (const [places] = useCollectionData(query, {idField:'id'}));
//       places.map(prev => <Marker key={prev.name} position={{lat:parseFloat(prev.Lat),lng:parseFloat(prev.long)}}/>)}
// }
  

  
  function signIn (){
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  function signOut () {
    if(auth.currentUser){
      auth.signOut();
    }
  }

  return (
    <div className="App">
      <header className='head'>
      {user && <button onClick={signOut} className="signOut">Sign Out</button>}
        <h1 className='title-top'>The People's Map</h1>
      </header>
      <section>
        {user ? <div><Map dat={places}/> <Input firebase={firebase} firestore={firestore} auth={auth}/></div> : <SignIn func={signIn}/>}
      </section>
      <footer className='foot'>
        <a className="helpLink"href="mailto:help@gmail.com">Click here for help</a>
      </footer>
    </div>
  )
}

export default App
