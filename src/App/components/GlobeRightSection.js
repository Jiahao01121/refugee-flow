import React from 'react';
import styled, { css } from 'styled-components';

import * as warDict from '../data/warDictionary';

import * as THREE from 'three';
import * as d3 from 'd3';
import * as _ from 'underscore';


class GlobeRightSection extends React.Component {
  constructor(props){
    super(props);

  }





  render(){

    const Background = styled.div`
      width: 25%;
      background: #15151C;
      height: 100%;
      position: absolute;
      right: 0;
      top: 60px;
      box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);

    `
    return(
      <Background>
      </Background>
    )

  }
}

export default GlobeRightSection;
