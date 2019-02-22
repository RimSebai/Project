import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <div>
        <p>
          <NavLink to="/api/houses"> Houses List</NavLink>
        </p>{' '}
        <p>
          {' '}
          <NavLink to="/home">Home</NavLink>
        </p>
      </div>
    );
  }
}

export default Nav;
