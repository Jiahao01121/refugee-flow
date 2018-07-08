import React from 'react';

import GlobeVisual from './GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';

import * as warDict from '../data/warDictionary';

import styles from '../stylesheets/GlobeTimeline.css'

class Timeline extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      current_Selected_Quater: null,
      selectedYear : 2010
    }
  }

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
          onClick= {() => {
            this.setState({current_Selected_Quater: null, selectedYear: year });
            this.props.onClickYear(year);
          }}
          onMouseOver= {(e) => {
            if(this.state.current_Selected_Quater != null){
              if(this.state.selectedYear == d3.select(e.target).text()){
                this.setState({current_Selected_Quater: null });
                this.props.onClickYear(year);
              }
            }
          }}
           >
          {year}
        </button>

        <button className = {this.quater_selected_check(1,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 1 });
            this.props.onClickQuater(1)
          }}
          >
          Quarter 1</button>
        <button className = {this.quater_selected_check(2,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() =>{
            this.setState({current_Selected_Quater: 2 });
            this.props.onClickQuater(2)
          }}
          >
          Quarter 2</button>
        <button className = {this.quater_selected_check(3,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 3 });
            this.props.onClickQuater(3)
          }}
          >
          Quarter 3</button>
        <button className = {this.quater_selected_check(4,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 4 });
            this.props.onClickQuater(4)
          }}
          >
          Quarter 4</button>
      </div>
    )
  }

  checkYearClassName(year){
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
    const TimelineItems = [];
    warDict.year.forEach( (d,i) => TimelineItems[i] = this.renderYearItem(d) );

    return(
      <div>
        <div
          className = 'TimelineWrapper'
          style ={{
            height: (window.innerHeight - 300) + 'px',
            zIndex: 1
           }}>
          {TimelineItems}
        </div>
      </div>
    )
  }
}

export default Timeline;
