import React from 'react';

import GlobeVisual from './GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';

import * as warDict from '../data/warDictionary';

class Timeline extends React.Component {

  constructor(props){
    super(props);

  }

  // componentDidMount(){
  //
  // }

  renderButton(year) {

    return(
      <button
        key={year}
        onClick= {() => this.props.onClickFn(year)}

      >
        {year}
      </button>
    )
  }

  render(){
    const renderList = [];
    warDict.year.forEach( (d,i) => renderList[i] = this.renderButton(d) );
    return(
      <div id="temp" style = {{position : "absolute"}}>
        {renderList}
      </div>
    )
  }
}

export default Timeline;
