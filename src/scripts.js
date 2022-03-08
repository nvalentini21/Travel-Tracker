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

const fetchData = (id) => {
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

const  handleApiErrors = (error) => {
  if (error.message === 'Failed to fetch'){
    window.alert("Ooops! The server is down. Please retry.");
  };
};

// Functions -----------------------------------------------------------------------------

const checkCredentials = (e) => {
  e.preventDefault()
  if (username.value.includes('traveler') && password.value === "travel" && username.value.length > 8 && username.value.length < 11) {
    const usernameArray = username.value.split('')
    if (username.value.length === 10) {
      const userId = parseInt(usernameArray.splice(usernameArray.length - 2, 2).join(''))
      domUpdates.hideElement(loginPage)
      domUpdates.showElement(mainPage)
      console.log(userId)
      loadPage(userId)
    }
    if (username.value.length === 9){
      const userId = parseInt(usernameArray.splice(usernameArray.length - 1, 1).join(''))
      domUpdates.hideElement(loginPage)
      domUpdates.showElement(mainPage)
      console.log(userId)
      loadPage(userId)
    }
  } else {
    domUpdates.showElement(errorMessage)
    setTimeout(removeErrorMessageAfterTime, 2000)
    loginForm.reset()
  }
}


const loadPage = (id) => {
  fetchData().then(allData => {
    travelRepository = new TravelRepository(allData)
    setDateMinAttribute();
    hideRequestConfirmation(confirmationMessage)
    travelRepository.createNewTraveler(id)
    updateNameDate(travelRepository, navDate, greeting)
    instantiateTripData(travelRepository)
    calculateAnnualCost(travelRepository)
    sortTravelerTripData(travelRepository)
    populateTravelerProfile(travelRepository)
    populateAllTripSections(travelRepository)
  })
};

//Misc-----------------------------------------------------------------------------------------

const setDateMinAttribute = () => {
  var today = new Date().toJSON().split('T')[0]
  minDate.setAttribute('min', today)
}

const removeErrorMessageAfterTime = () => {
  domUpdates.hideElement(errorMessage)
}

//Trips-----------------------------------------------------------------------------------------

const instantiateTripData = (travelRepo) => {
  const tripInstantiations = travelRepo.currentTraveler.instantiateTrips(travelRepo)
  return tripInstantiations
}

const sortTravelerTripData = (travelRepo) => {
  travelRepo.currentTraveler.sortTripsPast()
  travelRepo.currentTraveler.sortTripsFuture()
  travelRepo.currentTraveler.sortTripsPending()
  travelRepo.currentTraveler.sortTripsPresent()
}

const getDestinationID = (travelRepo) => {
  const iD = travelRepo.destinations.find(location => {
    if (location.destination == destinationInput.options[destinationInput.selectedIndex].value) {
      return location
    } else {
      domUpdates.showElement()
    }
  })
  return iD.id
}

const createTripObject = () => {
  const newTravelRequest = {
    id: travelRepository.trips.length + 1,
    userID: travelRepository.currentTraveler.id,
    destinationID: getDestinationID(travelRepository),
    travelers: parseInt(numTravelersInput.value),
    date: dateInput.value.split('-').join('/'),
    duration: parseInt(durationInput.value),
    status: 'pending',
    suggestedActivities: []
  }
  return newTravelRequest;
}

const postTripRequest = (e) => {
  e.preventDefault()
  const obj = createTripObject()
  fetchCalls.postData('http://localhost:3001/api/v1/trips', obj)
  travelForm.reset()
  showRequestConfirmation(confirmationMessage)
  setTimeout (function() {
    loadPage(travelRepository.currentTraveler.id)
    }, 3000)
}

//Traveler-----------------------------------------------------------------------------------

const calculateAnnualCost = (travelRepo) => {
  travelRepo.currentTraveler.calculateAnnualTotal()
}

//DOM Updates ----------------------------------------------------------------------------------

const showRequestConfirmation = (element) => {
  domUpdates.showElement(element)
}

const hideRequestConfirmation = (element) => {
  domUpdates.hideElement(element)
}

const populateTravelerProfile = (travelRepo) => {
  domUpdates.updateTravelerProfile(travelRepo, annualTotalSpent)
}

const updateNameDate = (travelRepo, elm1, elm2) => {
  domUpdates.updateDate(elm1)
  domUpdates.updateName(travelRepo, elm2)
}

const populateTrips = (travelRepo, tripGrid, array) => {
  if (travelRepo.currentTraveler[array].length > 0) {
    tripGrid.innerHTML = '';
    travelRepo.currentTraveler[array].forEach(trip => {
      domUpdates.populateTripSection(travelRepo, tripGrid, trip)
    })
  }
}
const populatePending = (travelRepo) => {
  if (travelRepo.currentTraveler.pendingTrips.length > 0) {
    pendingTripsGrid.innerHTML = '';
    travelRepo.currentTraveler.pendingTrips.forEach(trip => {
      domUpdates.populatePendingSection(travelRepo, pendingTripsGrid, trip)
    })
  }
}
const populateAllTripSections = (travelRepo) => {
  populateTrips(travelRepo, pastTripsGrid, 'pastTrips')
  populateTrips(travelRepo, presentTripsGrid, 'presentTrips')
  populateTrips(travelRepo, futureTripsGrid, 'futureTrips')
  populatePending(travelRepo)
}

//Query Selectors -----------------------------------------------------------------------------
const username = document.getElementById('userName');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('loginErrorMessage');
const mainPage = document.getElementById('mainPage');
const navDate = document.getElementById('localDate');
const greeting = document.getElementById('greeting');
const travelForm = document.getElementById('travelForm');
const dateInput = document.getElementById('dateInput');
const destinationInput = document.getElementById('destinationInput');
const durationInput = document.getElementById('numberOfDays');
const numTravelersInput = document.getElementById('numberOfTravelers');
const submitButton = document.getElementById('submitTravelRequest');
const annualTotalSpent = document.getElementById('annualTotal');
const pastTripsGrid = document.getElementById('pastTrips');
const presentTripsGrid = document.getElementById('presentTrips');
const futureTripsGrid = document.getElementById('futureTrips');
const pendingTripsGrid = document.getElementById('pendingTrips');
const minDate = document.getElementById('dateInput')
const confirmationMessage = document.getElementById('requestConfirmation');

//Event Listeners -----------------------------------------------------------------------------

loginForm.addEventListener('submit', function (e) {
  checkCredentials(e)
})
travelForm.addEventListener('submit', function (e) {
  postTripRequest(e)
})

//Global Variable -----------------------------------------------------------------------------

let travelRepository = null

export default handleApiErrors;
