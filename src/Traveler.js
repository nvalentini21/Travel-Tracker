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
};


export default Traveler;
