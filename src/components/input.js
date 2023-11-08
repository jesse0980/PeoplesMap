import React, { useRef, useState } from 'react';
export default function Input (props) {
    const [long, setLong] = React.useState('')
    const [lat, setLat] = React.useState('')
    const [name, setName] = React.useState('')

    const placesRef = props.firestore.collection('places');

    const sendPlace = async(e) => {
        e.preventDefault();
        const { uid, photoURL } = props.auth.currentUser;

        await placesRef.add({
          Lat: lat,
          long: long,
          name: name,
          createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL
        })
    
        setLong('');
        setLat('');
        setName('');
    }
    return(
        <form onSubmit={sendPlace} className='intake'>
            <input className='input1' value={long} onChange={e => setLong(e.target.value)} placeholder="Longitude"/>
            <input className='input2' value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude"/>
            <input className='input3' value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
            <button type="submit">Add Place</button>
        </form>
    )
}