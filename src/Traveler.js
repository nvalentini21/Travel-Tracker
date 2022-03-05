class Traveler {
  constructor(travelerData){
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
    this.totalSpent = 0;
  }
}

export default Traveler;
