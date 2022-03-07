let domUpdates ={
updateTravelerProfile: (traveler) => {
  annualTotalSpent.innerText = ` $${traveler.totalSpent}`
}
}

export default domUpdates;
