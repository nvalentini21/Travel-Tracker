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
      return (sum + sum * .90)
    }, 0)
    const rounded = total.toFixed(2)
    this.totalSpent = rounded;
    console.log(rounded)
    return rounded
  }

  sortTripsPast() {
    const pastTrips = this.allTrips.forEach(trip => {
      const date = new Date(trip.date)
      trip.date = date
      const today = new Date()
      if (date < today && trip.status === 'approved'){
        this.pastTrips.push(trip)
      }
    })
    console.log(`PAST`, this.pastTrips)
  }
  //
  // sortTripsPresent() {
  //   const presentTrips = this.allTrips.forEach(trip => {
  //     const date = new Date(trip.date)
  //     const today = new Date()
  //     if (date.getDay() === today.getDay()){
  //       this.presentTrips.push(trip)
  //     }
  //   })
  //   console.log(this.presentTrips)
  // }
  //

  sortTripsFuture() {
    const futureTrips = this.allTrips.forEach(trip => {
      const date = new Date(trip.date)
      trip.date = date
      const today = new Date()
      if (date > today && trip.status === 'approved'){
        this.futureTrips.push(trip)
        console.log(`FUTURE`, this.futureTrips)
      }
    })
  }

  sortTripsPending() {
    const pendingTrips = this.allTrips.forEach(trip => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    })
    console.log(`PENDING`, this.pendingTrips)
  }
};


export default Traveler;
