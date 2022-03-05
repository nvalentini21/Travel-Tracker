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

  instantiateDestinations(travelRepo) {
    const destinationData = travelRepo.destinations.find(location => location.id === this.destinationID)
    const newDestination = new Destination(destinationData)
    this.destinationData = newDestination
  }
};

export default Trip;
