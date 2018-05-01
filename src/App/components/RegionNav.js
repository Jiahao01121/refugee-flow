import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import RegionNavBar from '../stylesheets/RegionNavBar.css'

function SelectRegion (props) {
  var regions = ['All Regions', 'Africa', 'Asia', 'Middle East'];
  return (
    <ul className='regions'>
      {regions.map((region) => {
        return (
          <li
            style={region === props.selectedRegion ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, region)}
            key={region}>
              {region}
          </li>
        )
      })}
    </ul>
  )
}

SelectRegion.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

class RegionNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRegion: 'All Regions'
    };

    this.updateRegion = this.updateRegion.bind(this);
  }

  updateRegion(region) {
    this.setState(function() {
      return {
        selectedRegion: region
      }
    });
  }

  render() {
      return(
        <div>
          <SelectRegion
            selectedRegion={this.state.selectedRegion}
            onSelect={this.updateRegion}
          />
        </div>
    )
  }
}

export default RegionNav;
