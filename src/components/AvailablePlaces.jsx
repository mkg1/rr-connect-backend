import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
      // fetch provided by default by browser
      // fetch returns a promise (a js value that will eventually resolve to another value)
      // can chain fetch with .then to define a function that will run once the promise is resolved and response exists. 
      // another way to write fetch(...).then(...) is await const response = fetch(...) however, functional components can't be async so won't work
      fetch('http://localhost:3000/places').then((response) => {
        // .json() method returns another promise so can add another .then to the chain if you return response.json()
        return response.json()
      }).then((resData) => {setAvailablePlaces(resData.places)});
  }, [])


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
