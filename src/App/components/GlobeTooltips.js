import React from 'react';

import * as _ from 'underscore'
import styled, {css} from 'styled-components';
import * as warDict from '../data/warDictionary';

class GlobeTooltips extends React.Component {
  constructor(props){
    super(props);

    this.id = this.props.mv_tooltips[0];
    this.cot = this.props.mv_tooltips[1];
    this.fat = this.props.mv_tooltips[2];
    this.evt = this.props.mv_tooltips[3];
    this.int = this.props.mv_tooltips[4];

    this.mv_show = this.props.mv_show;

    this.mv_position = this.props.mv_position;
  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.mv_tooltips[0];
    this.cot = nextProps.mv_tooltips[1];
    this.fat = nextProps.mv_tooltips[2];
    this.evt = nextProps.mv_tooltips[3];
    this.int = nextProps.mv_tooltips[4];

    this.mv_show = nextProps.mv_show;

    this.mv_position = nextProps.mv_position;
  }

  toUpper(str) {
    return str.toLowerCase().split(' ').map( word => word[0].toUpperCase() + word.substr(1) ).join(' ')
 }




  render(){
    const Tooltip_warpper = styled.div`
      position: absolute;
      background: #15151c;
      box-shadow: 0px 0px 25px 2px rgba(0,0,0,0.75);
      width: 350px;
      height: 100px;
      color: white;
      overflow: hidden;
      ${'' /* transition: all 300ms ease-in-out; */}
      ${props => !props.showornot && css`
        display: none;
      `}

      ${props => props.mv_position && css`

        left: ${ props.mv_position[0] - (350/2) + 'px'};
        top:  ${ props.mv_position[1] + 20  + 'px'};
      `}
    `
    const Fatality = styled.p`
      font-family: 'Roboto';
      font-size: 20px;
      font-weight: 300;
      color: white;
      margin: 0;
      position: absolute;
      top: 7px;
      right: 10px;

      &:before{
        background-image: url(./fatality_icon.png);
        background-size: 25px 25px;
        display: inline-block;
        width: 25px;
        height: 25px;
        content: "";
        top: 4px;
        right: 7px;
        position: relative;
      }
    `
    const Country = styled.p`
      font-family: 'Roboto';
      font-size: 11px;
      font-weight: 400;
      color: white;
      margin: 0;
      left: 41px;
      position: absolute;
      width: 100%;
      top: 10px;

      &:after{
        content:${props => props.region ? "'" + props.region + "'": ''};
        position: absolute;
        color: white;
        top: 17px;
        left: 0;
      }

      &:before{
        content: '';
        width: 6px;
        position: absolute;
        height: 30px;
        background-color: #fff;
        left: -15px;
      }
    `
    const Event = styled.p`
      font-family: 'Roboto';
      font-size: 18px;
      font-weight: 900;
      color: white;
      margin: 0;
      top: 55px;
      position: relative;
      left: 27px;

      &:after{
        content: 'Click for more..';
        text-decoration: underline;
        color: #b6b7ca;
        font-size: 9px;
        font-weight: 400;
        position: relative;
        top: 0px;
        left: 5px;
      }
    `

    return(
      <Tooltip_warpper
        showornot = {this.mv_show}
        mv_position = {this.mv_position}
      >
        <Country region = { this.cot[1]}> {this.cot[0]} </Country>
        <Fatality> {this.fat} </Fatality>
        <Event> {this.toUpper(warDict.event_dict[this.evt])} </Event>
        {/* <p> {this.int} </p> */}
      </Tooltip_warpper>
    )
  }

}

export default GlobeTooltips;
