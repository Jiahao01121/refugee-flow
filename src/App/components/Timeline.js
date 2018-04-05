import React from 'react';

import GlobeVisual from './GlobeVisual';

import * as THREE from 'three';
import * as d3 from 'd3';

import * as warDict from '../data/warDictionary';

// import 'semantic-ui-css/semantic.min.css';
// import { Button } from 'semantic-ui-react';

import styled from 'styled-components';

class Timeline extends React.Component {

  constructor(props){
    super(props);

  }

  // componentDidMount(){
  //
  // }

  renderYearItem(year) {
    const Button = styled.button`
      font-family: 'Roboto';
      font-size: 0.75rem;
      font-weight: 700;
      color: white;
      border: 0;
      background: transparent;
      width: 50px;
      left: 35px;
      bottom: 8px;
      padding: 0;
      position: relative;
      cursor: pointer;

      &:hover{
        font-size: 13px;
        opacity: 0.7;
        transition: all 0.3s ease;
      }
    `
    const Wrapper = styled.div`
      width: 35px;
      padding: 0px;
      margin-bottom: 200px;
      height: 1px;
      background: white;
      cursor: pointer;
      &:first-child{
        margin-top: 5px;
      }
    `

    return(
      <Wrapper key= {year}>
        <Button
          onClick= {() => this.props.onClickFn(year)} >
          {year}
        </Button>
      </Wrapper>
    )
  }

  render(){
    const TimelineItems = [];
    warDict.year.forEach( (d,i) => TimelineItems[i] = this.renderYearItem(d) );

    const TimelineWrapper = styled.div`
      position:absolute;
      height: ${() => window.innerHeight- 60 - 320 + 'px'};
      width: 100px;
      margin-top: 320px;
      overflow-y: scroll;

      &::-webkit-scrollbar{
        width:0.5em;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #15151C;
        -webkit-border-radius: 4px;
      }

      &::before{
        content: "Timeline";
        position: relative;
        font-family: 'Roboto';
        font-size: 0.75rem;
        font-weight: 700;
        color: white;
        top: -2px;
        margin-left: 10px;
      }
    `


    return(
      <div>
        <TimelineWrapper>
          {TimelineItems}
        </TimelineWrapper>
      </div>
    )
  }
}

export default Timeline;
