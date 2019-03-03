let createReport = (invalidDataMessages, houses, validData) => {
  let invalidArray = [];
  invalidDataMessages.forEach((el, i) => {
    input = {};
    input.insertedHouse = houses[i];
    input.messages = el;
    el.length > 0 && invalidArray.push(input);
  });

  return invalidArray;
};

let creatNumberOfValidHouses = validData => {
  let numberOfValidHouses = [0];
  validData.forEach(el => {
    el.length === 14 && numberOfValidHouses++;
  });
  return numberOfValidHouses;
};

module.exports = { createReport, creatNumberOfValidHouses };
