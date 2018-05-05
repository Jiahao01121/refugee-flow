import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import api from '../utils/api';
// import RegionNavBar from '../stylesheets/RegionNavBar.css'

function SelectRegion (props) {
  var regions = ["Eastern Africa", "Middle Africa", "Middle East", "Northern Africa", "South-Eastern Asia", "Southern Africa", "Southern Asia", "Western Africa"];

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
      selectedRegion: 'Eastern Africa',
      regions: null
    };

    this.updateRegion = this.updateRegion.bind(this);
  }

  componentDidMount () {
    const url = 'http://' + window.location.hostname + ':2700' + '/data/war_all';

    this.fetchData(url).then(d => {
      console.log(d);
    })
  }

  fetchData(url){

    console.time("received & processed data");
    const request = new Request( url, {method: 'GET', cache: true});
    return (
      fetch(request).then(res => res.json()).then(
        d => {
          this.setState({
            data: d
          })
          return d = d.map(data =>{
            const dataYear = data.Year;
            const dataValue = data.value;
            const minMax = (()=>{
              if(Object.keys(dataValue).length == 4){
                const arr = dataValue[ Object.keys(dataValue)[0] ].concat(
                  dataValue[ Object.keys(dataValue)[1] ],
                  dataValue[ Object.keys(dataValue)[2] ],
                  dataValue[ Object.keys(dataValue)[3] ],
                )
                console.log(arr);
                let max = d3.max(arr,d => d.fat )
                console.log(max)
                let min = d3.min(arr,d => d.fat )
                console.log(min)
                return [min,max];
              }else{
                console.log("err at compute max/min");
              }
            })();

          })
        }

      )
    )
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
            regions={this.state.regions}
          />
        </div>
    )
  }
}

export default RegionNav;
