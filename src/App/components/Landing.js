import React, { Component } from 'react'
import styled from 'styled-components';
import Video from './Video';
import Introduction from './Introduction';
import * as _ from 'underscore';
import * as d3 from 'd3';

export default class Landing extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
    d3.select('#nav-show').style('display','none');
  }
  render() {
    return(
      <div>
        <Video />
        <Introduction />
      </div>
    )
  }
}
