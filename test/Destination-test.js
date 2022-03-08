import Destination from '../src/Destination'
import chai from 'chai';
import allData from './test-data'
const expect = chai.expect;


describe('Destination', () => {

  let destination

  destination = new Destination(allData.allDestinationData[0])

  beforeEach(function() {

  });

  it('should be a function', function () {
  expect(Destination).to.be.a('function');
  });

  it('should instantiate a Trip', function () {
    console.log(destination)
    expect(destination).to.be.an.instanceof(Destination);
  });

  it('should keep track of the trip ID', function () {
    expect(destination.id).to.eql(1);
  });

  it('should keep track of the destination name', function () {
    expect(destination.destination).to.eql("Lima, Peru");
  });

  it('should keep track of the lodging cost per day', function () {
    expect(destination.lodgingCostPerDay).to.eql(70);
  });

  it('should keep track of the flight cost per person', function () {
    expect(destination.flightCostPerPerson).to.eql(400);
  });

  it('should keep track of a destination image', function () {
    expect(destination.image).to.eql("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('should keep track of an alt text to use in place of the image', function () {
    expect(destination.alt).to.eql("overview of city buildings with a clear sky");
  });
});
