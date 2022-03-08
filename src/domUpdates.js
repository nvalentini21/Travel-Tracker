
let domUpdates ={
updateTravelerProfile: (travelRepo, element) => {
  element.innerText = `You've spent $${travelRepo.currentTraveler.totalSpent} in 2022 so far.`
},

populateTripSection: (travelRepo, element, trip) => {
  element.innerHTML += `<div class="trip-card">
      <h4 class="card-title">${trip.destinationData.destination}</h4>
      <img src="${trip.destinationData.image}" alt="${trip.destinationData.alt}" style="width:350px;height:auto;"</img>
      <p class="card-year">${trip.date.getFullYear()} </p>
    </div>`
},

populatePendingSection: (travelRepo, element, trip) => {
  element.innerHTML += `<div class="trip-card">
      <h4 class="card-title">${trip.destinationData.destination}</h4>
      <p class="card-year">${trip.date.getFullYear()} - PENDING APPROVAL </p>
      <img src="${trip.destinationData.image}" alt="${trip.destinationData.alt}" style="width:325px;height:auto;"</img>
      <p class="card-cost"> Estimated Total: $${trip.cost} </p>
    </div>`
},
}

export default domUpdates;
