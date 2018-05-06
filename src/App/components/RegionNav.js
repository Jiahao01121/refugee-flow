import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import api from '../utils/api';
import styled from 'styled-components';

const RegionContainer = styled.div`
  top: 140px;
  position: relative;
`
function SelectRegion (props) {
  var regions = ["Eastern Africa", "Middle Africa", "Middle East", "Northern Africa", "South-Eastern Asia", "Southern Africa", "Southern Asia", "Western Africa"];

  return (
    <ul className='regions'>
      {regions.map((region) => {
        return (
          <li
            style={region === props.selectedRegion ? {
              'borderStyle': 'solid',
              'borderWidth': '0px 0px 2px',
              'borderBottomColor': 'rgb(255, 0, 0)',
              'width': '150px',
              'height': '26px'
            } : null}
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
      selectedRegion: 'Eastern Africa',
      regions: null
    };
    this.data = this.props.data;
    this.updateRegion = this.updateRegion.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.data = nextProps.data;
  }

  componentDidMount () {
    console.log(this.data);

  }

  updateRegion(region) {
    console.log(region);
    console.log(this.state);
    this.setState(function() {
      return {
        selectedRegion: region
      }
    });
  }

  render() {
      return(
        <RegionContainer>
          <SelectRegion
            selectedRegion={this.state.selectedRegion}
            onSelect={this.updateRegion}
            regions={this.state.regions}
          />
        </RegionContainer>
    )
  }
}

export default RegionNav;
