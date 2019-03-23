let createReport = houses => {
  let invalidArray = [];
  houses.invalidData.forEach((el, i) => {
    let input = {};
    input.insertedHouse = houses[i];
    input.messages = el;
    el.length > 0 && invalidArray.push(input);
  });

  return invalidArray;
};

let creatNumberOfValidHouses = validData => {
  let numberOfValidHouses = validData.length;
  return numberOfValidHouses;
};

module.exports = { createReport, creatNumberOfValidHouses };
