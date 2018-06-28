import React from 'react';
import styled, { css } from 'styled-components';
import * as _ from 'underscore';
const routeDescDict = require('../data/route_desc.json');

const Wrapper = styled.div`
  width: 83%;
  position: relative;
  height: ${() => window.innerHeight-60-90 + 'px'};
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
`

const PlaceHolder = styled.div`
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
    content: "Current Situation";
    font-family: 'Roboto';
    font-size: 25px;
    color: #ffffff;
    font-weight: 100;
    position: fixed;
    top: -10px;
  }
`

export default class RefugeeRoute_textArea_content_basicInfo extends React.Component {

  constructor(props){
    super(props);
    this.description = this.description.bind(this);
    this.currentRouteName = props.currentRouteName;
  }

  componentWillReceiveProps(nextProps){
    this.currentRouteName = nextProps.currentRouteName;
  }

  description(textArr){
    return textArr.map((d,i) => <p key ={i}>{d}</p>);
  }

  render(){
    console.log(this.currentRouteName);

    return(
      <Wrapper>
        <PlaceHolder>
          {this.description(_.find(routeDescDict,d => d.route === this.currentRouteName).desc)}</PlaceHolder>
      </Wrapper>
    )
  }
}
