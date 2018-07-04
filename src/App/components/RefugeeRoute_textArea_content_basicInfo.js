import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';
import $ from "jquery";

const routeDescDict = require('../data/route_desc.json');

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: ${() => window.innerHeight-60-90 + 'px'};
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
`
const CurrentSituation = styled.div`
  height: 150px;
  overflow-y: scroll;
  top: 50px;
  position: relative;

  &::-webkit-scrollbar{
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }

  &>p{
    font-family: 'Roboto';
    font-size: 13px;
    font-weight: 300;
    color: #ffffff;
    position: relative;
    width: 98%;
  }

  &::before{

    content:${ props => "'" +'Current Situation - '+ props.currentRouteName + "'" };
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    position: fixed;
    top: -10px;
  }
`
const DeathSummary = styled.div`

  top: 120px;
  position: relative;

  &>p{
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    margin-bottom: 10px;
  }
`

const Stats = styled.div`
  height: 25px;
  background: #2f2f4ab3;
  border-radius: 4px;
  position: relative;
  float: left;
  transition: all 300ms;
  text-align: center;

  &>p{
    font-family: 'Roboto';
    color: white;
    font-weight: 600;
    font-size: 13px;
    position: relative;
    margin: auto;
    right: 0px;
    padding: 0 10px 0px 20px;
    transform: translateY(-50%);
    text-align: center;
    top: 50%;
    transition: all 300ms
  }

  &>p::before{
    content: "";
    width: 5px;
    height: 5px;
    left: 7px;
    position: absolute;
    border-radius: 50%;
    background: #8383ab;
    top: 50%;
    transform: translateY(-50%);
  }

  &>p::after{
    content: 'Accumulative Death/Missing Count';
    font-family: 'Roboto';
    font-size: 13px;
    color: #ffffff;
    font-weight: 100;
    position: absolute;
    top: 1px;
    margin-left: 18px;
    width: 220px;
    text-align: left;
  }
`

export default class RefugeeRoute_textArea_content_basicInfo extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.route_death_data = props.route_death_data;

    this.description = this.description.bind(this);
    this.calculateDeathTotal = this.calculateDeathTotal.bind(this);
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    console.log('update');

    $('#CurrentSituation__text').stop(true,true);
    $('#CurrentSituation__text').scrollTop(0);
    $('#CurrentSituation__text').animate({scrollTop: $('#CurrentSituation__text')[0].scrollHeight}, 25000);

    d3.select('.route-map-titleGroup__basic') && d3.select('.route-map-titleGroup__basic')
      .style('opacity',0)
      .transition()
      .duration(400)
      .style('opacity',1)

    this.currentRouteName = nextProps.currentRouteName;
  }

  description(textArr){
    return textArr.map((d,i) => <p key ={i}>{d}</p>);
  }

  calculateDeathTotal(){
    let total = 0;
    _.groupBy(this.route_death_data,d => d.route)[this.currentRouteName].forEach(d => total += +d.dead_and_missing );

    return d3.format(',')(total);
  }

  render(){
    return(
      <Wrapper className='route-map-titleGroup__basic'>
        <CurrentSituation currentRouteName = {this.currentRouteName} id="CurrentSituation__text"
          onClick={()=> $('#CurrentSituation__text').stop(true,true).scrollTop(0)}>
          {this.description(_.find(routeDescDict,d => d.route === this.currentRouteName).desc)}
        </CurrentSituation>

        <DeathSummary>
          <p>Death Summary - {this.currentRouteName}</p>
          <Stats><p>{this.calculateDeathTotal()}</p></Stats>

        </DeathSummary>
      </Wrapper>
    )
  }
}
