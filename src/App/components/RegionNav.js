import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import styled from 'styled-components';
import {countryList} from '../data/warDictionary';
import _ from 'underscore';

const RegionContainer = styled.div`
  top: 14%;
  position: relative;
`
function SelectRegion (props) {

  var regions = (() =>{
    let temp = [];
    countryList.forEach(d => temp.push(d[1]));
    return _.uniq(temp)
  })()

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
      selectedRegion: 'Middle Africa',
      regions: null,
      data_list: []
    };
    this.data = this.props.data;
    this.updateRegion = this.updateRegion.bind(this);
    this.aggregate = this.aggregate.bind(this);
    this.pass = this.props.pass;
  }

  componentDidMount () {
    this.country = this.aggregate(this.data);
    this.setState({selectedRegion:'Middle East'});
    this.pass(this.country,this.state.selectedRegion);

    //ugly fix for Region component jqury stuff
    setTimeout(() =>{
      this.setState({selectedRegion:'Middle East'});
      this.pass(this.country,this.state.selectedRegion);
    },10)
  }

  aggregate(d){
    this.country = (() =>{
      let arr = [];
      countryList.forEach((d,i) =>{
        let temp = {};
        temp['country'] = d[0];
        temp['total_fat'] = [];
        temp['region'] = d[1];
        temp['fat_year'] = {
          '2010':[],
          '2011':[],
          '2012':[],
          '2013':[],
          '2014':[],
          '2015':[],
          '2016':[],
          '2017':[],
          '2018':[],
        };
        arr.push(temp)
      })
      return arr;
    })();
    d.forEach((d,i) =>{
      let t = d.value[0][1];
      for (var i = t.length - 1; i >=0; i-=4) {
        let country_ref_index = _.findIndex(this.country,{ 'country' : t[i].cot[0].toUpperCase() } );
        country_ref_index >=0 && this.country[country_ref_index].fat_year[d.year].push( d.scaler.invert(t[i].fat) )
        country_ref_index >=0 && this.country[country_ref_index].total_fat.push(d.scaler.invert(t[i].fat))
      }
    })

    this.country.forEach( d => {
      d.total_fat = d.total_fat.reduce((a,c) => a+c,0)
      for (let year in d.fat_year) {d.fat_year[year] = d.fat_year[year].reduce((a,c) => a+c,0)}
    });
    this.country = _.groupBy(this.country,d => d.region)

    return this.country;
  }

  updateRegion(region) {
    if(this.state.selectedRegion != region) {
      this.setState({selectedRegion: region})
      this.pass(this.country,region)
    }
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
