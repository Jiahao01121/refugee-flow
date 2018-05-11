import React from 'react';
import styled, { keyframes , css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';

const CountUp = require('countup.js');

const BoardWrapper = styled.div`
  width: ${props => props.container_width +'px'};
  height: 40px;
  position: absolute;
  ${'' /* background: red; */}
  bottom: 50px;
  right: 25%;
`

const BoardItem = styled.div`
  width: ${props => props._width+ 'px'};
  height: 40px;
  background: #2f2f4ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  ${props => props.order === 0 && css`
    margin-left: ${props => props._margin_end+'px'};
  `}

  ${props => props.order === 1 && css`
    margin: ${props => '0 ' + ((props.container_width - (props._width*3 + props._margin_end*2) )/2+'px')};
  `}

  ${props => props.order === 2 && css`
    margin-right: ${props => props._margin_end+'px'};
  `}

  &:hover{
    background: #2f2f4a;
    cursor: pointer;
  }

  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 100;
    font-size: 25px;
    position: relative;
    margin: auto;
    right: 15px;
    text-align: end;
    transform: translateY(-50%);
    top: 50%;
    transition: all 300ms;

    &:after{
      content:${props => "'" + props.name + "'"};
      left: 38px;
      font-weight: 500;
      font-size: ${props => props.fontSize};
      position: absolute;

      top: 47%;
      transform: translateY(-50%);
    }

    &:before{
      content: "";
      width: 5px;
      height: 5px;
      left: 25px;
      position: absolute;
      border-radius: 50%;
      background: #8383ab;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`



class GlobeStatsBoard extends React.Component {

  constructor(props) {
    super(props);
    this.drawBoard = this.drawBoard.bind(this);
    this.data = this.props.data;
    this.container_width = (window.innerWidth*.75) - 165 - 90;
  }

  componentWillReceiveProps(nextProps){
    if(!_.isMatch(this.data, nextProps.data)){
      const keys = Object.keys(nextProps.data);
      if(!this.data) this.data = {'Total Fatality': 0,'Civilian Fatality': 0,'Armed Conflict Count': 0};
      for (let i = 0; i<keys.length; i++) {
        new CountUp('stats_'+i,this.data[keys[i]], nextProps.data[keys[i]], 0, 2.5, {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',}).start();
      }

      this.data = nextProps.data;
    }
  }

  drawBoard(data){
    if(data){
      const jsxArr = [];
      const keys = Object.keys(data);
      for (let i = 0; i<keys.length; i++) {

        jsxArr.push(
          <BoardItem
            key={keys[i]}
            order={i}
            _width={this.container_width/4}
            _margin_end={this.container_width/20}
            container_width = {this.container_width}
            name={(()=>{
              if(window.innerWidth < 1450){
                return i === 2 ? 'War Count' : keys[i]
              }else{
                return keys[i]
              }
            })()}
            fontSize={(()=>{
              if(window.innerWidth < 1450){
                return '9px';
              }else{
                return '12px';
              }
            })()}
            >{ <p id ={'stats_'+i}>{ Math.floor(data[keys[i]]) }</p> }</BoardItem>
        )
      }
        return jsxArr;
    }
  }



  render() {

    this.jsxArr = this.drawBoard(this.data);
    return (
      <BoardWrapper container_width = {this.container_width}>
        {this.jsxArr}
      </BoardWrapper>
    );

  }
}

export default GlobeStatsBoard;
