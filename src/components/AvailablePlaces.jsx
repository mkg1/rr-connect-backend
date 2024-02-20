import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState()

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

      try {
        const places = await fetchAvailablePlaces(); // must await this because every fn decorated with async will yield a promise!
        //getCurrentPosition doesn't yield a promise so can't use async await, but can use callback pattern (function called after/from getCurrentPosition) to define code that should be executed once position is available 
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(resData.places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        })
      } catch (error) {
        setError({message: error.message || 'custom error message'})
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, [])

  if (error) {
    return <Error title="an error occured" message={error.message} />
  }
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
