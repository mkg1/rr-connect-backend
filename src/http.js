export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) { //if ok, 200 or 300 status code
      throw new Error('Failed to fetch places'); //this will crash the application, so need to use try/catch block
    }  

    return resData.places;
}