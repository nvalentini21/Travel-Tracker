
import './css/styles.scss';
import TravelRepository from './TravelRepository'
import Trip from './Trip'
import fetchCalls from './apiCalls';
import domUpdates from './domUpdates';

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
    const usernameArray = username.value.split('');
    parseID(usernameArray, 10, 2);
    parseID(usernameArray, 9, 1);
  } else {
    domUpdates.showElement(errorMessage);
    setTimeout(removeErrorMessageAfterTime, 2000);
    loginForm.reset();
  };
};

const parseID = (name, arrayLength, num) => {
  if (username.value.length === arrayLength){
    const userId = parseInt(name.splice(name.length - num, num).join(''));
    domUpdates.hideElement(loginPage);
    domUpdates.showElement(mainPage);
    loadPage(userId);
  };
};

const loadPage = (id) => {
  fetchData().then(allData => {
    travelRepository = new TravelRepository(allData);
    setDateMinAttribute();
    hideRequestConfirmation(confirmationMessage);
    travelRepository.createNewTraveler(id);
    updateNameDate(travelRepository, navDate, greeting);
    instantiateTripData(travelRepository);
    calculateAnnualCost(travelRepository);
    sortTravelerTripData(travelRepository);
    populateTravelerProfile(travelRepository);
    populateAllTripSections(travelRepository);
    updateDestinationSelection(travelRepository);
  });
};

//Misc-----------------------------------------------------------------------------------------

const setDateMinAttribute = () => {
  var today = new Date().toJSON().split('T')[0];
  minDate.setAttribute('min', today);
};

const removeErrorMessageAfterTime = () => {
  domUpdates.hideElement(errorMessage);
};

const updateDestinationSelection = (travelRepo) => {
  const destinations = travelRepo.destinations.map(destination => destination.destination);
  const destinationsSorted = destinations.sort();
  destinationsSorted.forEach(name => {
    domUpdates.createDestinationList(destinationInput, name);
  });
};

//Trips-----------------------------------------------------------------------------------------

const instantiateTripData = (travelRepo) => {
  const tripInstantiations = travelRepo.currentTraveler.instantiateTrips(travelRepo);
  return tripInstantiations;
}

const sortTravelerTripData = (travelRepo) => {
  travelRepo.currentTraveler.sortTripsPast();
  travelRepo.currentTraveler.sortTripsFuture();
  travelRepo.currentTraveler.sortTripsPending();
  travelRepo.currentTraveler.sortTripsPresent();
}

const getDestinationID = (travelRepo) => {
  if (destinationInput.options[destinationInput.selectedIndex].value == "All Locations") {
    domUpdates.showElement(destinationError);
    travelForm.reset();
    setTimeout (function() {
      domUpdates.hideElement(destinationError)
    }, 3000);
  }
  const iD = travelRepo.destinations.find(location => {
    if (location.destination == destinationInput.options[destinationInput.selectedIndex].value) {
      return location;
    }
  })
  return iD.id;
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
  };
  return newTravelRequest;
}

const postTripRequest = (e) => {
  e.preventDefault();
  const destinationValue = destinationInput.options[destinationInput.selectedIndex].value;
  const obj = createTripObject();
  fetchCalls.postData('http://localhost:3001/api/v1/trips', obj);
  travelForm.reset();
  showRequestConfirmation(confirmationMessage);
  setTimeout (function() {
    loadPage(travelRepository.currentTraveler.id)
  }, 3000);
};

const getEstimate = (e) => {
  e.preventDefault()
  let obj = createTripObject()
  const possibleTrip = new Trip(obj)
  possibleTrip.instantiateDestination(travelRepository)
  possibleTrip.calcTotalCost()
  if (dateInput.value && numTravelersInput.value && durationInput){
    requestEstimateMessage.innerText = `Estimated cost with 10% agent fee: $${possibleTrip.cost}.00`
    domUpdates.showElement(requestEstimateMessage)
    setTimeout (function() {
      domUpdates.hideElement(requestEstimateMessage)
    }, 4000);
  }
}


//Traveler-----------------------------------------------------------------------------------

const calculateAnnualCost = (travelRepo) => {
  travelRepo.currentTraveler.calculateAnnualTotal();
}

//DOM Update Helpers ----------------------------------------------------------------------------------

const showRequestConfirmation = (element) => {
  domUpdates.showElement(element);
}

const hideRequestConfirmation = (element) => {
  domUpdates.hideElement(element);
}

const populateTravelerProfile = (travelRepo) => {
  domUpdates.updateTravelerProfile(travelRepo, annualTotalSpent);
}

const updateNameDate = (travelRepo, elm1, elm2) => {
  domUpdates.updateDate(elm1);
  domUpdates.updateName(travelRepo, elm2);
}

const populateTrips = (travelRepo, tripGrid, array) => {
  if (travelRepo.currentTraveler[array].length > 0) {
    tripGrid.innerHTML = '';
    travelRepo.currentTraveler[array].forEach(trip => {
      domUpdates.populateTripSection(travelRepo, tripGrid, trip);
    });
  };
};

const populatePending = (travelRepo) => {
  if (travelRepo.currentTraveler.pendingTrips.length > 0) {
    pendingTripsGrid.innerHTML = '';
    travelRepo.currentTraveler.pendingTrips.forEach(trip => {
      domUpdates.populatePendingSection(travelRepo, pendingTripsGrid, trip)
    });
  };
};

const populateAllTripSections = (travelRepo) => {
  populateTrips(travelRepo, pastTripsGrid, 'pastTrips');
  populateTrips(travelRepo, presentTripsGrid, 'presentTrips');
  populateTrips(travelRepo, futureTripsGrid, 'futureTrips');
  populatePending(travelRepo);
};

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
const getEstimateButton = document.getElementById('estimateTravelRequest');
const submitButton = document.getElementById('submitTravelRequest');
const destinationError = document.getElementById('destinationError');
const dateError = document.getElementById('dateError');
const annualTotalSpent = document.getElementById('annualTotal');
const pastTripsGrid = document.getElementById('pastTrips');
const presentTripsGrid = document.getElementById('presentTrips');
const futureTripsGrid = document.getElementById('futureTrips');
const pendingTripsGrid = document.getElementById('pendingTrips');
const minDate = document.getElementById('dateInput')
const confirmationMessage = document.getElementById('requestConfirmation');
const requestEstimateMessage = document.getElementById('requestEstimate');
//Event Listeners -----------------------------------------------------------------------------

loginForm.addEventListener('submit', function (e) {
  checkCredentials(e);
})
travelForm.addEventListener('submit', function (e) {
  postTripRequest(e);
})

getEstimateButton.addEventListener('click', function (e) {
  getEstimate(e)
})

//Global Variable -----------------------------------------------------------------------------

let travelRepository = null;

export default handleApiErrors;
