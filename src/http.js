export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) { //if ok, 200 or 300 status code
      throw new Error('Failed to fetch places'); //this will crash the application, so need to use try/catch block
    }  

    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}), //need to convert places array to JSON before sending
        headers: {
            'Content-Type': 'application/json' //required to make sure data is successfully extracted on the backend
        }
    })

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to update places');
    }

    return resData.message
}