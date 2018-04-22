import React from 'react';

import GlobeVisual from './GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';

import * as warDict from '../data/warDictionary';

// import 'semantic-ui-css/semantic.min.css';
// import { Button } from 'semantic-ui-react';

// import styled, { css } from 'styled-components';
import styles from '../stylesheets/GlobeTimeline.css'

class Timeline extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      current_Selected_Quater: 1
    }
  }

  // componentDidMount(){
  //
  // }

  quater_selected_check(num,year){
    if(year == this.props.currentYear){
      if(num === this.state.current_Selected_Quater){
        return 'quaters quater_selected quater_currentYear'
      }else{
        return 'quaters quater_currentYear'
      }
    }else{
      return 'quaters quaters_disabled'
    }
  }

  renderYearItem(year) {


    return(
      <div key= {year} className="individualWrapper">
        <button
          className = {this.checkYearClassName(year)}
          onClick= {() => this.props.onClickYear(year)} >
          {year}
        </button>

        <button className = {this.quater_selected_check(1,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => {
            this.setState({current_Selected_Quater: 1 });
            this.props.onClickQuater(1)
          }}
          >
          Quater 1</button>
        <button className = {this.quater_selected_check(2,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() =>{
            this.setState({current_Selected_Quater: 2 });
            this.props.onClickQuater(2)
          }}>
          Quater 2</button>
        <button className = {this.quater_selected_check(3,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => {
            this.setState({current_Selected_Quater: 3 });
            this.props.onClickQuater(3)
          }}>
          Quater 3</button>
        <button className = {this.quater_selected_check(4,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onClick= {() => {
            this.setState({current_Selected_Quater: 4 });
            this.props.onClickQuater(4)
          }}>
          Quater 4</button>
      </div>
    )
  }

  checkYearClassName(year){
    console.log('called');
    if(year == this.props.currentYear){
      return 'years_selected years'
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
    console.log(this.state);
    const TimelineItems = [];
    warDict.year.forEach( (d,i) => TimelineItems[i] = this.renderYearItem(d) );

    return(
      <div>
        <div
          className = 'TimelineWrapper'
          style ={{ height: (window.innerHeight- 60 - 300) + 'px' }}>
          {TimelineItems}
        </div>
      </div>
    )
  }
}

export default Timeline;
