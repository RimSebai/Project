const express = require('express');
const apiRouter = express.Router();
const connection = require('./db');
const validation = require('./validation');
const report = require('./report');

let houses = [];

apiRouter.route('/houses').get((req, res) => res.json(houses));
apiRouter.route('/contribution').post((req, res) => {
  let sql = `replace into houses (link,
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

  if (!Array.isArray(req.body)) {
    res.status(400).json({ error: 'Data should be an array' });
  } else {
    let valid = validation.validator(req.body);
    let finalReport = report.createReport(valid.invalidDataMessages, req.body);
    let numberOfValidHouses = report.creatNumberOfValidHouses(valid.validData);
    res.json({ finalReport, numberOfValidHouses });

    //____Inserting houses and adding date______
    valid.validData.forEach(house => {
      house.length === 14 &&
        (house.splice(1, 0, Date.now()),
        connection.query(sql, [house], function(err, result, field) {
          if (err) throw err;
        }));
    });
    //____End Inserting houses and adding date______
  }
});
apiRouter
  .route('/houses/:id')
  .get((req, res) => {
    const { id } = req.params;
    const house = houses.find(house => house.id === parseInt(id, 10));
    house ? res.send(house) : res.status(404).send(`No house has id ${id}`);
  })
  .delete((req, res) => {
    let housesBeforeDelete = houses.length;
    const { id } = req.params;
    houses = houses.filter(house => house.id !== Number(id));
    let housesAfterDelete = houses.length;
    housesBeforeDelete > housesAfterDelete
      ? res.send('house was deleted')
      : res.send('No house has id to deleted');
  });

module.exports = { apiRouter };
