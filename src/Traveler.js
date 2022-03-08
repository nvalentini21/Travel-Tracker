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
      const todayDate = new Date()
      const tripDate = new Date(trip.date)
      if (tripDate.getFullYear() === todayDate.getFullYear() && trip.status === 'approved'){
        sum += trip.cost
      }
      return sum
    }, 0)
    const totalWithFee = total + total * 0.10
    const rounded = totalWithFee.toFixed(2)
    this.totalSpent = rounded;
    return rounded
  }

  sortTripsPast() {
    const pastTrips = this.allTrips.forEach(trip => {
      const date = new Date(trip.date)
      trip.date = date
      const today = new Date()
      if (date < today && trip.status === 'approved'){
        this.pastTrips.push(trip)
        this.pastTrips.sort((a, b) => a.date - b.date)
      }
    })
    console.log(`PAST`, this.pastTrips)
  }
  //
  sortTripsPresent() {
    const pastTrips = this.allTrips.forEach(trip => {
      const date = new Date(trip.date)
      const dateArray = date.toString().split(' ').splice(1, 3)
      const today = new Date()
      const todayArray = today.toString().split(' ').splice(1, 3)
      if (dateArray[1] === todayArray[1] && dateArray[0] === todayArray[0] && dateArray[2] === todayArray[2]){
        this.presentTrips.push(trip)
        this.presentTrips.sort((a, b) => a.date - b.date)
      }
    })
    console.log(`CURRENT`, this.presentTrips)
  }


  sortTripsFuture() {
    const futureTrips = this.allTrips.forEach(trip => {
      const date = new Date(trip.date)
      trip.date = date
      const today = new Date()
      if (date > today && trip.status === 'approved'){
        this.futureTrips.push(trip)
        this.futureTrips.sort((a, b) => a.date - b.date)
        console.log(`FUTURE`, this.futureTrips)
      }
    })
  }

  sortTripsPending() {
    const pendingTrips = this.allTrips.forEach(trip => {
      if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
        this.pendingTrips.sort((a, b) => a.date - b.date)
      }
    })
    console.log(`PENDING`, this.pendingTrips)
  }
};


export default Traveler;
