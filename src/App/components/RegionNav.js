import React, { Component } from 'react';
import RegionNavBar from '../stylesheets/RegionNavBar.css'

class RegionNav extends Component {
  render() {
    return (
      <div className="RegionNavBar">
        <button>All Regions</button>
        <button>Africa Region</button>
        <button>Asia Region</button>
        <button>Mid-East Region</button>
      </div>
    )
  }
}

export default RegionNav;
