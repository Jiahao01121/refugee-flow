import React from 'react';
import styled, { css } from 'styled-components';

import * as warDict from '../data/warDictionary';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore';

import $ from "jquery";

class GlobeRSChart extends React.Component {
  constructor(props){
    super(props);

    this.data = this.props.data;
    this.margin = {top: 20, right: 20, bottom: 30, left: 50}
    // this.processData = this.processData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("as");
    this.data = this.props.data;
  }

  componentDidMount(){
    // this.processData(this.data);
    // console.log(this.yExtent);
  }

  // processData(data){
  //
  //   this.width = $(this.mount).width() - this.margin.left - this.margin.right;
  //   this.height = $(this.mount).height() - this.margin.top - this.margin.bottom;
  //   this.svg = d3.select(this.mount);
  //   this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  //
  //
  //   const _data = data.slice();
  //   _data.forEach(d =>{
  //     for (var quater in d.value) {
  //       d.value[quater] = d.value[quater].reduce((a, c) => {
  //         return {
  //           Value:a.Value + c.Value
  //         }
  //       }, {Value: 0})
  //     }
  //   })
  //
  //   if(_data.length > 0){
  //     let extentY = [];
  //     for (var quater in _data[0].value) {
  //       extentY.push(_data[0].value[quater].Value)
  //     }
  //     extentY = d3.extent(extentY);
  //     console.log(Object.keys(_data[0].value));
  //     // const x = d3.scaleOrdinal().domain().range([0,this.width])
  //     const y = d3.scaleLinear().domain(extentY).range([this.height,0])
  //   }
  //
  //
  //   return _data;
  //
  // }



  render(){
    console.log(this.data);
    const Chart = styled.div`
        width: 90%;
        left: 5%;
        background: blue;
        height: 75%;
        position: absolute;
        top: 15%;
    `
    return(
      <Chart>
        <svg width='100%' height='100%' ref={(mount) => {return this.mount = mount }}>

        </svg>
      </Chart>
    )

  }
}

export default GlobeRSChart;
