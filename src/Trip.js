import Destination from './Destination'

class Trip {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.userID = travelerData.userID;
    this.travelers = travelerData.travelers;
    this.date = travelerData.date;
    this.duration = travelerData.duration;
    this.status = travelerData.status;
    this.suggestedActivities = travelerData.activities;
    this.cost = 0;
    this.destinationID = travelerData.destinationID;
    this.destinationData = ''
  }

  instantiateDestination(travelRepo) {
    const destinationData = travelRepo.destinations.find(location => location.id === this.destinationID)
    const newDestination = new Destination(destinationData)
    this.destinationData = newDestination
  }
  //

  calcTotalFlightCost() {
    const flightCost = this.destinationData.flightCostPerPerson
    const totalCost = flightCost * this.travelers
    console.log(totalCost)
    return totalCost
  }
  //
  calcRoundTripCost() {
    const flightCost = this.destinationData.flightCostPerPerson
    const totalCost = flightCost * this.travelers
    console.log(totalCost * 2)
    return totalCost * 2
  }
  //
  calcTotalLodgingCost() {
    const lodgingCost = this.destinationData.lodgingCostPerDay
    console.log(lodgingCost * this.duration)
    return lodgingCost * this.duration
  }

  calcTotalCost() {
    this.calcTotalFlightCost()
    this.calcTotalLodgingCost()

  }
};

export default Trip;
