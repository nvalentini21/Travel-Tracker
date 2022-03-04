import TravelRepository from '..src/TravelRepository'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;

describe('Travel Repository', () => {

  let userRepository, allData;

  beforeEach(function() {

    userRepository = new TravelRepository(allData);

  });

  it('should be a function', function () {
  expect(TravelRepository).to.be.a('function');
});

it('should instantiate a Travel Repository', function () {
  expect(userRepository).to.be.an.instanceof(UserRepository);
});

it('should keep track of a collection of all traveler data', function () {
  expect(userRepository.userData).to.eql(allData.userData);
});
