const express = require('express');
const app = express();
const api = express.Router();

let houses = [{ id: 1, price: 10000 }, { id: 2, price: 23999 }, { id: 3, price: 450000 }];
let lastId = Math.max.apply(Math, houses.map(lastId => lastId.id));

api
  .route('/houses')
  .get((req, res) => res.json(houses))
  .post((req, res) => {
    const id = lastId + 1;
    const { price } = req.body;
    let newHouse = { id, price };
    price
      ? Number.isNaN(price) || price <= 0
        ? res.status(404).end('the price should be valid number')
        : houses.push(newHouse) && res.json(newHouse)
      : res.status(404).end('the price is required');
  });
api
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

module.exports = api;
