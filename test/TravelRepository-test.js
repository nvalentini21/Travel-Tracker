import TravelRepository from '../src/TravelRepository'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Travel Repository', () => {

  let travelRepository

  beforeEach(function() {

    travelRepository = new TravelRepository(allData);

  })


  it('should be a function', function () {
  expect(TravelRepository).to.be.a('function');
})

it('should instantiate a Travel Repository', function () {
  expect(travelRepository).to.be.an.instanceof(TravelRepository);
})

it('should keep track of a collection of all traveler data', function () {
  expect(travelRepository.travelers).to.eql(allData.allTravelerData);
})

it('should keep track of a collection of all trip data', function () {
  expect(travelRepository.trips).to.eql(allData.allTripsData);
})

it('should keep track of a collection of all destination data', function () {
  expect(travelRepository.destinations).to.eql(allData.allDestinationData);
})
})
