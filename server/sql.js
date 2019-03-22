const connection = require('./db');

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
    house.length === 15 &&
      connection.query(addHousesSql, [house], function(err, result, field) {
        if (err) throw err;
      });
  });
};
//_____End of adding houses_______
//______Creating valid search sql___________
const createSearchSql = query => {
  const params = [query.price_min, query.price_max];
  let searchSql = `select * from houses where price_value between ? and ? `;

  if (query.country) {
    params.push(query.country);
    searchSql += ` and location_country = ?`;
  }
  if (query.city) {
    params.push(query.city);
    searchSql += ` and location_city = ?`;
  }
  if (query.rooms) {
    params.push(query.rooms);
    searchSql += ` and size_rooms = ?`;
  }
  if (query.order) {
    const index = query.order.lastIndexOf('_');
    if (index > 0) {
      let order_field, order_direction;
      order_field = query.order.slice(0, index);
      order_direction = query.order.slice(index + 1);
      searchSql += ` order by ${connection.escapeId(order_field, true)} ${order_direction}`;
    }
  }

  if (query.page) {
    let housesPerPage = 4;
    let offset = (query.page - 1) * housesPerPage;
    searchSql += ` limit ${housesPerPage} offset ${offset}`;
  }
  return { searchSql, params };
};

//______End Creating valid search sql___________

module.exports = { addHouses, createSearchSql };
