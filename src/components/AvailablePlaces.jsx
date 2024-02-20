import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   function fetchPlaces
  //     // fetch provided by default by browser
  //     // fetch returns a promise (a js value that will eventually resolve to another value)
  //     // can chain fetch with .then to define a function that will run once the promise is resolved and response exists. 
  //     // another way to write fetch(...).then(...) is await const response = fetch(...) however, functional components can't be async so won't work
  //     fetch('http://localhost:3000/places').then((response) => {
  //       // .json() method returns another promise so can add another .then to the chain if you return response.json()
  //       return response.json()
  //     }).then((resData) => {setAvailablePlaces(resData.places)});
  // }, [])

  // alternative to chainging .thens: you can use async/await inside useEffect hook by wrapping the fetch in a new fetchPlaces function
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }
    fetchPlaces();
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      loadingText="Fetching places..."
      isLoading={isFetching}
      onSelectPlace={onSelectPlace}
    />
  );
}
