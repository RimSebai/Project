const validator = require('validator');
const moment = require('moment');

const houseKeys = [
  'link',
  'market_date',
  'location_country',
  'location_city',
  'location_address',
  'location_coordinates_lat',
  'location_coordinates_lng',
  'size_living_area',
  'size_rooms',
  'price_value',
  'price_currency',
  'description',
  'title',
  'images',
  'sold',
];

let validatorFun = (houses, invalidDataMessages = [], validData = []) => {
  houses.forEach(home => {
    let house = {};
    let validHouse = [];
    let invalidHouse = [];
    if (Object.keys(home).length === 0 || !home.constructor === Object) {
      invalidDataMessages.push([`you insert has to be Object and not empty`]);
    } else {
      houseKeys.map(el => (home[el] ? (house[el] = home[el]) : null));
      if (!house.link) {
        invalidHouse.push('Link is required field');
      } else if (!validator.isURL(house.link)) {
        invalidHouse.push(`${house.link} is not Valid Link`);
      } else {
        validHouse.push(house.link);
      }
      if (!house.market_date) {
        let date = moment().format('YYYY-MM-DD');
        validHouse.push(date);
      } else if (houses.market_date !== moment(houses.market_date).format('YYYY-MM-DD')) {
        invalidHouse.push('the date should be formated as YYYY-MM-DD');
      } else {
        validHouse.push(house.market_date);
      }
      if (!house.location_country) {
        invalidHouse.push('Country Name is required field');
      } else if (typeof house.location_country !== 'string' || house.location_country.length <= 2) {
        invalidHouse.push(`${house.location_country} is not Valid Country name`);
      } else {
        validHouse.push(house.location_country);
      }
      if (!house.location_city) {
        invalidHouse.push('City Name is required field');
      } else if (typeof house.location_city !== 'string' || house.location_city.length <= 2) {
        invalidHouse.push(`${house.location_city} is not Valid City name`);
      } else {
        validHouse.push(house.location_city);
      }
      if (
        !(house.location_coordinates_lat && house.location_coordinates_lng) &&
        !house.location_address
      ) {
        invalidHouse.push('You have to insert either address or ING and LAT');
      } else {
        if (house.location_address) {
          validHouse.push(String(house.location_address));
        } else {
          validHouse.push('');
        }
        if (typeof house.location_coordinates_lat === 'number') {
          validHouse.push(house.location_coordinates_lat);
        } else if (!house.location_coordinates_lat) {
          validHouse.push(0);
        } else {
          invalidHouse.push('lat should be a number');
        }
        if (typeof house.location_coordinates_lng === 'number') {
          validHouse.push(house.location_coordinates_lng);
        } else if (!house.location_coordinates_lng) {
          validHouse.push(0);
        } else {
          invalidHouse.push('lng should be a number');
        }
      }
      if (!house.size_living_area) {
        invalidHouse.push('size of living area is required');
      } else if (isFinite(house.size_living_area)) {
        validHouse.push(house.size_living_area);
      } else {
        invalidHouse.push('size should be a number');
      }
      if (!house.size_rooms) {
        invalidHouse.push('number of rooms is required');
      } else if (typeof house.size_rooms === 'number' && house.size_rooms > 0) {
        validHouse.push(house.size_rooms);
      } else {
        invalidHouse.push('number of rooms should be valid number');
      }
      if (!house.price_value) {
        invalidHouse.push('Price is required field');
      } else if (house.price_value <= 0 || !isFinite(house.price_value)) {
        invalidHouse.push(`${house.price_value} is not Valid Price`);
      } else {
        validHouse.push(house.price_value);
      }
      if (!house.price_currency) {
        invalidHouse.push('Currency is required field');
      } else if (
        ['EUR', 'USD', 'JPY', 'GBP'].indexOf(String(house.price_currency).toUpperCase()) === -1
      ) {
        invalidHouse.push('Currency should be one of this (EUR,USD,JPY,GBP)');
      } else {
        validHouse.push(house.price_currency);
      }
      if (!house.description) {
        validHouse.push('');
      } else {
        validHouse.push(house.description + '');
      }
      if (!house.title) {
        validHouse.push('');
      } else {
        validHouse.push(house.title + '');
      }
      if (!house.images) {
        validHouse.push('http://www.transparentpng.com/thumb/house/house-vector-5.png');
      } else {
        let URLs = house.images.split(',');
        let imagesErrors = '';
        let arr = [];
        URLs.map(URL => {
          if (validator.isURL(URL)) {
            arr.push(URL);
          } else {
            imagesErrors += `this ${URL}is not valid URL`;
          }
        });
        imagesErrors && invalidHouse.push(imagesErrors);
        arr.length > 0 && validHouse.push(arr.join(','));
      }
      if (!house.sold) {
        validHouse.push(0);
      } else if (house.sold === 1 || house.sold === 0) {
        validHouse.push(house.sold);
      } else {
        invalidHouse.push('sold should be 1 or 0');
      }
      invalidDataMessages.push(invalidHouse);
      validData.push(validHouse);
    }
  });
  return { validData, invalidDataMessages };
};

module.exports = { validatorFun };
