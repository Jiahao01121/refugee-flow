import React, { Component } from 'react';
import RegionNavBar from '../stylesheets/RegionNavBar.css'

class RegionNav extends Component {
  render() {
    return (
      <div className="RegionNavBar">
        <button>Global</button>
        <button>Africa</button>
        <button>Asia</button>
        <button>Mid-East</button>
      </div>
    )
  }
}

export default RegionNav;
