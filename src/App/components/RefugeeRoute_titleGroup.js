import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import * as _ from 'underscore';
const dataDict = require('../data/IBC_crossingCountByCountry.json');

const Wrapper = styled.div`
  position: absolute;
  width: 45%;
  z-index: 1;
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
  width: 450px;
  height: 20px;
  left: 30px;
  top: 100px;
  background: #363658;
  position: relative;
`

export default class RefugeeRoute_titleGroup extends React.Component {

  constructor(props){
    super(props);
    this.currentRouteName = props.currentRouteName;
    this.changeRouteManager = props.changeRouteManager;
    this.handleClick = this.handleClick.bind(this);
    this.handleRouting = this.handleRouting.bind(this);
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

  render(){

    return(
      // <p>{this.state.currentRouteName && JSON.stringify(this.state.route_IBC[this.state.currentRouteName])}</p>
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
        <Legend></Legend>
      </Wrapper>
    )
  }
}
