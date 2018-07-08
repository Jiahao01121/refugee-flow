import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import * as _ from 'underscore';
import { color_map } from '../data/routeDictionary';
const dataDict = require('../data/IBC_crossingCountByCountry.json');

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  height: 0;
  box-shadow: 1px 10px 950px 180px rgba(0,0,0,0.82);
  top: 10px;
`
const Title = styled.p`
  color: white;
  font-family: 'Roboto';
  font-size: 26px;
  font-weight: 200;
  margin: 0;
  top: 70px;
  left: 60px;
  position: relative;
  width: 400px;
  cursor: default;

  &:after{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut';
    left: -30px;
    color: white;
    position: absolute;
    top: 50px;
    width: 450px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
  }
`
const Button_previous = styled.div`
  position: absolute;
  width: 22px;
  left: 30px;
  top: 70px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  margin: 0;

  &:hover{opacity: 1;}
`
const Button_next = styled.div`
  position: relative;
  width: 22px;
  left: 30px;
  top: 51px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  margin: 0;

  &:hover{opacity: 1;}
`
const Legend = styled.div`
  left: 30px;
  top: 100px;
  position: relative;
  width: 45%;
`
const LegendItem = styled.p`
  color: #121217;
  ${'' /* color: white; */}
  font-size: 10px;
  font-family: 'Roboto';
  font-weight: 500;
  background: ${props => props.color};
  position: relative;
  float: left;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 9px 0px 0px;
  opacity: ${props => props.hide ? 0.15 : 0.85};
  transition: all 300ms;
  cursor: pointer;
  &:hover{
    opacity: ${props => props.hide ? 0.3 : 1};
  }
`

const Instructions = styled.div`
  left: 30px;
  top: ${() => window.innerHeight - 100 + 'px'};
  position: absolute;
  background: #f5f5ff21;
  border-radius: 2px;
  transition: all 400ms;
  cursor: default;
  &>p{
    color: #ffffff78;
    font-size: 12px;
    font-family: 'Roboto';
    font-weight: 300;
    padding: 0 10px;
    margin: 5px 0;
  }

  &:hover{
    background: #2a467d54;
    &>p{
      color: #ffffff;
    }
  }
`

export default class RefugeeRoute_titleGroup extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.changeRouteManager = props.changeRouteManager;
    this.passBannedCategoryManager = props.passBannedCategoryManager;
    this.handleClick = this.handleClick.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
    this.legendGenerator = this.legendGenerator.bind(this);
    this.handleLegendClick = this.handleLegendClick.bind(this);
    this.state = {
      mapLegend_hide_0: false,
      mapLegend_hide_1: false,
      mapLegend_hide_2: false,
      mapLegend_hide_3: false,
      mapLegend_hide_4: false,
      mapLegend_hide_5: false,
      mapLegend_hide_6: false,
    };
  }

  componentWillReceiveProps(nextProps){
    this.currentRouteName = nextProps.currentRouteName;
  }

  handleClick(type){
    const index = _.findIndex(dataDict,d => d.route === this.currentRouteName);

    if(type === 'previous'){
      if(index != -1 && index > 0){
        this.changeRouteManager(dataDict[index-1].route);
      }
    }
    else if(type === 'next'){
      if(index != -1 && index < dataDict.length - 1){
        this.changeRouteManager(dataDict[index+1].route);
      }
    }
  }

  handleRouting(type){
    const index = _.findIndex(dataDict,d => d.route === this.currentRouteName);

    if(type === 'previous'){
      if(index != -1 && index > 0){
        return dataDict[index-1].route.replace(' ','')
      }else{
        return dataDict[index].route.replace(' ','')
      }
    }
    else if(type === 'next'){
      if(index != -1 && index < dataDict.length - 1){
        return dataDict[index+1].route.replace(' ','')
      }else{
        return dataDict[index].route.replace(' ','')
      }
    }
  }

  handleLegendClick(category,index){
    this.passBannedCategoryManager(category);
    this.setState({
      ['mapLegend_hide_'+index]: !this.state['mapLegend_hide_'+index]
    });
  }

  legendGenerator(){

    let output = new Array(color_map.length);

    color_map.forEach((d,i) => {
      let text = '';

      if(d.key === 'malicious intent related death / manslaughter'){
        text = 'Malicious intent related death / Manslaughter';
      }
      else if(d.key === 'unknown - supposedly exhaustion related death'){
        text = 'Unknown - Supposedly exhaustion related death';
      }else{
        text = d.key.charAt(0).toUpperCase() + d.key.substr(1)
      }

      output[i] = <LegendItem
        key={'mapLegend_'+i}
        color={d.value}
        hide={this.state['mapLegend_hide_'+i]}
        onClick={() => this.handleLegendClick(d.key,i)}
      >{text}</LegendItem>
    })

    return output;

  }

  render(){

    return(
      <Wrapper>
        <Title>{this.currentRouteName && this.currentRouteName}</Title>
        <Router>
          <div>
            <Button_previous
              onClick={() => this.handleClick('previous')}>
              <Link to={"/route/" + this.handleRouting('previous')}>
                <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 320l128-128 128 128z"/></svg>
              </Link>
            </Button_previous>

            <Button_next
              onClick={() => this.handleClick('next')}>
              <Link to={"/route/" + this.handleRouting('next')}>
                <svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M128 192l128 128 128-128z"/></svg>
              </Link>
            </Button_next>
          </div>
        </Router>
        <Legend>{this.legendGenerator()}</Legend>

        <Instructions>
          <p>* Click up/down arrow to switch refugee route</p>
          <p>* Click mouseovered point to access detail information about accident/event</p>
        </Instructions>
      </Wrapper>
    )
  }
}
