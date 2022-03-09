import TravelRepository from '../src/TravelRepository'
import Traveler from '../src/Traveler'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Travel Repository', () => {

  let travelRepository

  beforeEach(function() {

    travelRepository = new TravelRepository(allData);

  });

  it('should be a function', function () {
  expect(TravelRepository).to.be.a('function');
  });

  it('should instantiate a Travel Repository', function () {
    expect(travelRepository).to.be.an.instanceof(TravelRepository);
  });

  it('should keep track of a collection of all traveler data', function () {
    expect(travelRepository.travelers).to.eql(allData.allTravelerData);
  });

  it('should keep track of a collection of all trip data', function () {
    expect(travelRepository.trips).to.eql(allData.allTripData);
  });

  it('should keep track of a collection of all destination data', function () {
    expect(travelRepository.destinations).to.eql(allData.allDestinationData);
  });

  it('should instantiate a new user based on the current user and keep track of that user', function() {
    travelRepository.createNewTraveler(1)
    expect(travelRepository.currentTraveler).to.be.an.instanceof(Traveler);
    expect(travelRepository.currentTraveler.name).to.eql(allData.allTravelerData[0].name);
  });

  it ('should return an error if the user cannot be found by ID', function() {
    expect(travelRepository.createNewTraveler(57)).to.equal(`ID invalid. Cannot find traveler.`);
  })
});
