const express = require('express');
const apiRouter = express.Router();
const connection = require('./db');
const validation = require('./validation');
const report = require('./report');
const sql = require('./sql');
const queryVal = require('./queryValidation');
// let selectionData = {};
apiRouter.route('/houses/filter').get((req, res) => {
  let sql =
    'select DISTINCT location_country , size_rooms,location_city from houses group by location_city';
  connection.query(sql, function(error, results) {
    if (error) {
      throw error;
    } else {
      let countries = results.map(result => result.location_country);
      let cities = results.map(result => result.location_city);
      let rooms = [...new Set(results.map(result => result.size_rooms))];
      // selectionData = { countries, cities, rooms };
      res.json({ countries, cities, rooms });
    }
  });
});

apiRouter.route('/houses').get((req, res) => {
  // console.log(req.query, selectionData);
  queryVal.queryValidation(req.query);
  let sql = 'select * from houses';
  connection.query(sql, function(error, result) {
    if (error) {
      throw error;
    } else {
      res.json(result);
    }
  });
});
apiRouter.route('/contribution').post((req, res) => {
  if (!Array.isArray(req.body)) {
    res.status(400).send;
  } else {
    let valid = validation.validator(req.body);
    let finalReport = report.createReport(valid.invalidDataMessages, req.body);
    let numberOfValidHouses = report.creatNumberOfValidHouses(valid.validData);
    res.json({ finalReport, numberOfValidHouses });
    sql.addHouses(valid.validData);
  }
});
apiRouter
  .route('/houses/:id')
  .get((req, res) => {
    // const { id } = req.params;
    // const house = houses.find(house => house.id === parseInt(id, 10));
    // house ? res.send(house) : res.status(404).send(`No house has id ${id}`);
  })
  .delete((req, res) => {
    // let housesBeforeDelete = houses.length;
    // const { id } = req.params;
    // houses = houses.filter(house => house.id !== Number(id));
    // let housesAfterDelete = houses.length;
    // housesBeforeDelete > housesAfterDelete
    //   ? res.send('house was deleted')
    //   : res.send('No house has id to deleted');
  });

module.exports = { apiRouter };
