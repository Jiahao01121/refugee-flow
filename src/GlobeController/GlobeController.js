import React from 'react';
import './GlobeController.css';

import GlobeVisual from '../GlobeVisual/GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';


class GlobeController extends React.Component {

  constructor(props){
    super(props);

  }

  // componentDidMount(){
  //
  // }

  renderButton(year) {
    return(
      <button onClick= {this.props.onClickFn()}>
        {year}
      </button>
    )
  }

  render(){
    return(
      <div id="temp">
        {this.renderButton(2011)}
        {this.renderButton(2012)}
        {this.renderButton(2013)}
      </div>
    )
  }
}

export default GlobeController;
