import Trip from './Trip'

class Traveler {
  constructor(travelerData, tripsData){
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.allTrips = tripsData;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
    this.totalSpent = 0;
  }

  instantiateTrips(travelRepo) {
    const instantiatedTrips = this.allTrips.map(trip => {
      const newTrip = new Trip(trip)
      newTrip.instantiateDestination(travelRepo)
      newTrip.calcTotalCost()
      return newTrip
    })
    this.allTrips = instantiatedTrips;
    console.log(this.allTrips)
  }

  calculateAnnualTotal() {
    const total = this.allTrips.reduce((sum, trip) => {
      sum += trip.cost
      return sum
    }, 0)
    console.log(total)
    return total
  }

  sortTripsPast() {
    const pastTrips = this.allTrips.forEach(trip => {
      //compare dates, if less than present push to pastTrips array. 
    })
  }
};


export default Traveler;
