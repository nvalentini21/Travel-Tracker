// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';
import './css/styles.scss';
import TravelRepository from './TravelRepository'
import Trip from './Trip'
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';

// import domUpdates from '.domUpdates';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
//Query Selectors -----------------------------------------------------------------------------

// API handling -----------------------------------------------------------------------------


const returnPromise = () => {
  const allTravelerData = fetchCalls.fetchData('travelers');
  const allTripData = fetchCalls.fetchData('trips');
  const allDestinationData = fetchCalls.fetchData('destinations');
  return Promise.all([allTravelerData, allTripData, allDestinationData])
    .then(data => {
    let allData = {}
    allData.allTravelerData = data[0].travelers;
    allData.allTripData = data[1].trips;
    allData.allDestinationData = data[2].destinations;
    return allData;
  });
};




// Functions -----------------------------------------------------------------------------

const loadPage = () => {
  returnPromise().then(allData => {
    const travelRepository = new TravelRepository(allData)
    travelRepository.createNewTraveler(5)
    instantiateTripData(travelRepository)
    // instantiateDestinationData(travelRepository)
  })
}

//Trips-----------------------------------------------------------------------------------------

const instantiateTripData = (travelRepo) => {
  const tripInstantiations = travelRepo.currentTraveler.instantiateTrips(travelRepo)
  return tripInstantiations
}

//Traveler-----------------------------------------------------------------------------------


//Destinations---------------------------------------------------------------------------------------

//Event Listeners -----------------------------------------------------------------------------

window.addEventListener('load', loadPage)
