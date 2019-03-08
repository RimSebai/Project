const connection = require('./db');
const { promisify } = require('util');
const getCountries = promisify(connection.query.bind(connection));

//________Adding houses________
let addHousesSql = `replace into houses (link,
  market_date,  
  location_country,
  location_city,
  location_address,
  location_coordinates_lat,
  location_coordinates_lng,
  size_living_area,
  size_rooms, 
  price_value,
  price_currency, 
  description,
  title,
  images,
  sold
  )values(?)`;
addHouses = validData => {
  validData.forEach(house => {
    house.length === 14 &&
      (house.splice(1, 0, Date.now()),
      connection.query(addHousesSql, [house], function(err, result, field) {
        if (err) throw err;
      }));
  });
};
//_____End of adding houses_______

module.exports = { addHouses };
