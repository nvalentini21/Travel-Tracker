
let domUpdates ={
updateTravelerProfile: (travelRepo, element) => {
  element.innerText = `You've spent $${travelRepo.currentTraveler.totalSpent} in 2022 so far.`
},

populateTripSection: (travelRepo, element, trip) => {
  element.innerHTML += `<div class="trip-card">
      <h4 class="card-title">${trip.destinationData.destination}</h4>
      <img src="${trip.destinationData.image}" alt="${trip.destinationData.alt}" style="width:200px;height:auto;"</img>
      <p class="card-year">${trip.date.getFullYear()} </p>
    </div>`
}
}

export default domUpdates;
