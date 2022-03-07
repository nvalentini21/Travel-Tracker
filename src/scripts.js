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

// API handling -----------------------------------------------------------------------------


const fetchData = () => {
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

const date1= new Date()
const date2 = new Date()

let travelRepository = null

// Functions -----------------------------------------------------------------------------

const loadPage = () => {
  fetchData().then(allData => {
    travelRepository = new TravelRepository(allData)
    travelRepository.createNewTraveler(9)
    instantiateTripData(travelRepository)
    calculateAnnualCost(travelRepository)
    sortTravelerTripData(travelRepository)
    populateTravelerProfile(travelRepository)
    populatePastTrips(travelRepository)
  })
}

const  handleApiErrors = (error) => {
  if (error.message === 'Failed to fetch'){
    window.alert("Ooops! Something went wrong. Please retry.");
  };
};


//Trips-----------------------------------------------------------------------------------------

const instantiateTripData = (travelRepo) => {
  const tripInstantiations = travelRepo.currentTraveler.instantiateTrips(travelRepo)
  return tripInstantiations
}

const sortTravelerTripData = (travelRepo) => {
  travelRepo.currentTraveler.sortTripsPast()
  travelRepo.currentTraveler.sortTripsFuture()
  travelRepo.currentTraveler.sortTripsPending()
}

const getDestinationID = (travelRepo) => {
  const iD = travelRepo.destinations.find(location => {
    if (location.destination == destinationInput.value) {
      return location
    }
  })
  return iD.id
}

const createTripObject = () => {
  const newTravelRequest = {
    id: travelRepository.trips.length + 1,
    userID: travelRepository.currentTraveler.id,
    destinationID: getDestinationID(travelRepository),
    travelers: numTravelersInput.value,
    date: dateInput.value.split('-').join('/'),
    duration: durationInput.value,
    status: 'pending',
    suggestedActivities: []
  }
  return newTravelRequest;
}

const postTripRequest = (e) => {
  e.preventDefault()
  const obj = createTripObject()
  fetchCalls.postData('http://localhost:3001/api/v1/trips', obj)
  // .then(() => loadPage())

  setTimeout (loadPage, 3000)
}
//Traveler-----------------------------------------------------------------------------------

const calculateAnnualCost = (travelRepo) => {
  travelRepo.currentTraveler.calculateAnnualTotal()
}

//DOM Updates ----------------------------------------------------------------------------------

const populateTravelerProfile = (travelRepo) => {
  annualTotalSpent.innerText = `You've spent $${travelRepo.currentTraveler.totalSpent} in 2022 so far.`
}

const populatePastTrips = (travelRepo) => {
  travelRepo.currentTraveler.pastTrips.forEach(trip => {
    pastTripsGrid.innerHTML += ``
    pastTripsGrid.innerHTML += `<div class="trip-card">
        <h4>${trip.destinationData.destination}</h4>
        <p>Date Travelled: ${trip.date.toString()} </p>
        <p> Cost: $ ${trip.cost} </p>
        <img src="${trip.destinationData.image}" alt="${trip.destinationData.alt}" style="width:100px;height:auto;"</img>
      </div>`
  })

}


//Query Selectors -----------------------------------------------------------------------------

const travelForm = document.getElementById('travelForm');
const dateInput = document.getElementById('dateInput');
const destinationInput = document.getElementById('destinationInput');
const durationInput = document.getElementById('numberOfDays');
const numTravelersInput = document.getElementById('numberOfTravelers');
const submitButton = document.getElementById('submitTravelRequest');
const annualTotalSpent = document.getElementById('annualTotal');
const pastTripsGrid = document.getElementById('pastTrips');

//Event Listeners -----------------------------------------------------------------------------

window.addEventListener('load', loadPage)
travelForm.addEventListener('submit', function (e) {
  postTripRequest(e)
})

export default handleApiErrors;
