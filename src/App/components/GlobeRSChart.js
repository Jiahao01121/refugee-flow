import React from 'react';
import styled, { css } from 'styled-components';

import * as warDict from '../data/warDictionary';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore';


class GlobeRSChart extends React.Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    console.log("------ Globe mounted");

    const url = 'http://' + window.location.hostname + ':2700' + '/data/war_all';
    // this.fetchData(url).then(d =>{ console.timeEnd("received & processed data");
    //   this.setState({
    //     warData: d
    //   });
    //
    //   this.drawData(d[0].value); // Default view : 2010;
    //   this.gv.lastIndex = 0; // For animation purpose;
    //   this.gv.transition(this.gv.lastIndex); // Animate interface;
    //   this.gv.animate();
    // });

  }




  render(){

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

      </Chart>
    )

  }
}

export default GlobeRSChart;
