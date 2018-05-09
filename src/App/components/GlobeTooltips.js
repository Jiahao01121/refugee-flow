import React from 'react';

import * as _ from 'underscore'
import styled, {css, keyframes} from 'styled-components';
import * as warDict from '../data/warDictionary';

const expend_tooltips_animation = keyframes`
  100% {
    height: 300px;
    width: 400px;
  }
`
const Tooltip_warpper = styled.div`
  position: absolute;
  opacity: 1;
  background: #15151ce6;
  box-shadow: 0px 0px 25px 2px rgba(0,0,0,0.75);
  width: 350px;
  height: 100px;
  color: white;
  overflow: hidden;
  transition: all 300ms ease-in-out;

  ${'' /* hide tooltips when mouseleave */}
  ${props => !props.showornot && css`
    animation: ${keyframes`
      100% {
        filter: blur(5px);
        opacity: 0;
        visibility: hidden;
      }
    `} .35s;
    animation-fill-mode: forwards;
  `}

  ${'' /* tooltips position*/}
  ${props => props.mv_position && css`
    left: ${ props.mv_position[0] - (350/2) + 'px'};
    top:  ${ props.mv_position[1] + 30  + 'px'};
  `}

  ${'' /* expend tooltips*/}
  ${props => props.expendornot && css`
    animation: ${expend_tooltips_animation} .4s;
    animation-fill-mode: forwards;
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

  ${'' /* &:before{
    background-image: url(./fatality_icon.png);
    background-size: 25px 25px;
    display: inline-block;
    width: 25px;
    height: 25px;
    content: "";
    top: 4px;
    right: 7px;
    position: relative;
  } */}

  &:before{
    content: 'Fatality: ';
    color: #b6b7ca;
    font-size: 9px;
    font-weight: 400;
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
  width: 95%;

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
const Expend_notes = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 100;
  left: 25px;
  position: relative;
  top: 62px;
  width: 88%;
  line-height: 1.8;
`
const Expend_source = styled.p`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 800;
  position: absolute;
  bottom: 0;
  right: 10px;
  ${props => !props.hideText && css`
      display: none;
  `}
`
const ExitButton = styled.button`
  font-family: 'Roboto';
  font-size: 10px;
  position: absolute;
  left: 5px;
  top: 5px;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  opacity: .7;
  transition: all 300ms;
  &:hover{
    opacity: 1;
    font-size: 15px;
  }
`

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

    this.tooltips_clicked = this.props.tooltips_clicked;
    this.tooltips_expendInfo = this.props.tooltips_expendInfo;

  }

  componentWillReceiveProps(nextProps) {
    this.id = nextProps.mv_tooltips[0];
    this.cot = nextProps.mv_tooltips[1];
    this.fat = nextProps.mv_tooltips[2];
    this.evt = nextProps.mv_tooltips[3];
    this.int = nextProps.mv_tooltips[4];

    this.mv_show = nextProps.mv_show;

    this.mv_position = nextProps.mv_position;

    this.tooltips_clicked = nextProps.tooltips_clicked;
    this.tooltips_expendInfo = nextProps.tooltips_expendInfo;
  }

  toUpper(str) {
    return str.toLowerCase().split(' ').map( word => word[0].toUpperCase() + word.substr(1) ).join(' ')
  }

  render(){
    var expend_note_text;
    var limitation_note = 459
    if(this.tooltips_expendInfo[0] != undefined){
      var temp = this.tooltips_expendInfo[0].notes.toString().length
      if(temp>limitation_note){
        expend_note_text = this.tooltips_expendInfo[0].notes.slice(0,limitation_note) + '...';
      }else{
        expend_note_text = this.tooltips_expendInfo[0].notes;
      }
    }

    var expend_source_text;
    var limitation_source = 50;
    if(this.tooltips_expendInfo[0] != undefined){
      var t = this.tooltips_expendInfo[0].source.replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,'').replace(/;/g,'');
      var temp = t.toString().length;
      if(temp>limitation_source){
        expend_source_text = "Source: " + t.slice(0,limitation_note);
      }else{
        expend_source_text = "Source: " + t;
      }
    }

    return(
      <Tooltip_warpper
        showornot = {this.mv_show}
        mv_position = {this.mv_position}
        expendornot = {this.tooltips_clicked}
      >

        <ExitButton onClick={() => this.props.tooltips_onexit() }>x</ExitButton>
        <Country region = { this.cot[1]}> {this.cot[0]} </Country>
        <Fatality> {this.fat} </Fatality>
        <Event> {this.toUpper(warDict.event_dict[this.evt])} </Event>
        <Expend_notes> {expend_note_text} </Expend_notes>
        <Expend_source hideText = {this.tooltips_clicked}>{expend_source_text}</Expend_source>
      </Tooltip_warpper>
    )
  }

}

export default GlobeTooltips;
