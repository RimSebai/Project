import React from 'react';

class Filter extends React.Component {
  render() {
    return (
      <form className="filter-form">
        <label>Select By Country</label>
        <select>
          <option values="0">0</option>
          <option values="Netherlands">Netherlands</option>
          <option values="France">France</option>
          <option values="Romania">Romania</option>
          <option values="Austria">Austria</option>
          <option values="Germany">Germany</option>
        </select>
        <label>Select By City</label>
        <select>
          <option values="0">0</option>
          <option values="Amsterdam">Amsterdam</option>
          <option values="Paris">Paris</option>
          <option values="Bucharest">Bucharest</option>
          <option values="Vienna">Vienna</option>
          <option values="Berlin">Berlin</option>
        </select>
        <label>Select By Price</label>
        <select>
          <option values="0">0</option>
          <option values="500000">500000</option>
          <option values="750000">750000</option>
          <option values="100000">100000</option>
          <option values="125000">125000</option>
          <option values="150000">150000</option>
        </select>
        <label>Select By Number of rooms</label>
        <select>
          <option values="0">0</option>
          <option values="1">1</option>
          <option values="2">2</option>
          <option values="3">3</option>
          <option values="4">4</option>
          <option values="5">5</option>
        </select>
      </form>
    );
  }
}

export default Filter;
