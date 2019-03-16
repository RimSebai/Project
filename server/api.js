const express = require('express');
const connection = require('./db');
const validation = require('./validation');
const report = require('./report');
const sql = require('./sql');
const queryVal = require('./queryValidation');

const apiRouter = express.Router();

apiRouter.route('/houses/filter').get((req, res) => {
  const searchSql =
    'select DISTINCT location_country , size_rooms,location_city from houses group by location_city';
  connection.query(searchSql, (error, results) => {
    if (error) {
      throw error;
    } else {
      const countries = results.map(result => result.location_country);
      const cities = results.map(result => result.location_city);
      const rooms = [...new Set(results.map(result => result.size_rooms))];
      res.json({ countries, cities, rooms });
    }
  });
});

apiRouter.route('/houses').get((req, res) => {
  console.log('query', req.query);
  let validRequest = queryVal.queryValidation(req.query);
  if (validRequest[0]) {
    let result = sql.createSearchSql(validRequest[1]);
    connection.query(result.searchSql, result.params, (error, result) => {
      if (error) {
        throw error;
      } else {
        res.json(result);
      }
    });
  } else {
    res.status(400).json(validRequest[1]);
  }
});
apiRouter.route('/contribution').post((req, res) => {
  if (!Array.isArray(req.body)) {
    res.status(400).json({ error: 'data should be in array' });
  } else {
    const valid = validation.validator(req.body);
    const finalReport = report.createReport(valid.invalidDataMessages, req.body);
    const numberOfValidHouses = report.creatNumberOfValidHouses(valid.validData);
    res.json({ finalReport, numberOfValidHouses });
    sql.addHouses(valid.validData);
  }
});
// apiRouter
//   .route('/houses/:id')
// .get((req, res) => {
// const { id } = req.params;
// const house = houses.find(house => house.id === parseInt(id, 10));
// house ? res.send(house) : res.status(404).send(`No house has id ${id}`);
// })
// .delete((req, res) => {
// let housesBeforeDelete = houses.length;
// const { id } = req.params;
// houses = houses.filter(house => house.id !== Number(id));
// let housesAfterDelete = houses.length;
// housesBeforeDelete > housesAfterDelete
//   ? res.send('house was deleted')
//   : res.send('No house has id to deleted');
// });

module.exports = { apiRouter };
