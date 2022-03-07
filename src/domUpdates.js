
const travelForm = document.getElementById('travelForm');
const dateInput = document.getElementById('dateInput');
const destinationInput = document.getElementById('destinationInput');
const durationInput = document.getElementById('numberOfDays');
const numTravelersInput = document.getElementById('numberOfTravelers');
const submitButton = document.getElementById('submitTravelRequest');
const annualTotalSpent = document.getElementById('annualTotal');
const pastTripsGrid = document.getElementById('pastTrips');


let domUpdates ={
updateTravelerProfile: (traveler) => {
  annualTotalSpent.innerText = ` $${traveler.totalSpent}`
}
}

export default domUpdates;
