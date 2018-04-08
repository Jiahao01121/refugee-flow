import React from 'react';

import GlobeVisual from './GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';

import * as warDict from '../data/warDictionary';

// import styled, { css } from 'styled-components';
// import styles from '../stylesheets/globeTimeline.css'

class GlobeTimeline extends React.Component {

  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //
  // }

  renderYearItem(year) {
    return(
      <div key= {year} className="individualWrapper">
        <button
          className = {this.checkYearClassName(year)}
          onClick= {() => this.props.onClickYear(year)} >
          {year}
        </button>

        <button className = 'quaters'
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => this.props.onClickQuater(1)}
          >
          Quater 1</button>
        <button className = 'quaters'
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => this.props.onClickQuater(2)}>
          Quater 2</button>
        <button className = 'quaters'
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => this.props.onClickQuater(3)}>
          Quater 3</button>
        <button className = 'quaters'
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => this.props.onClickQuater(4)}>
          Quater 4</button>
      </div>
    )
  }

  checkYearClassName(year){
    console.log('called');
    if(year == this.props.currentYear){
      return 'selected years'
    }else{
      return 'years'
    }
  }

  checkQuaterDisabled(year){
    if(year != this.props.currentYear){
      return true
    } else{
      return false
    }

  }

  render(){
    const TimelineItems = [];
    warDict.year.forEach( (d,i) => TimelineItems[i] = this.renderYearItem(d) );

    return(
      <div>
        <div
          className = 'TimelineWrapper'
          style ={{ height: (window.innerHeight- 60 - 320) + 'px' }}>
          {TimelineItems}
        </div>
      </div>
    )
  }
}

export default GlobeTimeline;
