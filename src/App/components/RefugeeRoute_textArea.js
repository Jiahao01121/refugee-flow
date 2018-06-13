import React from 'react';
import styled from 'styled-components';
import * as _ from 'underscore';
import $ from "jquery";

const Wrapper = styled.div`
  height: ${window.innerHeight - 60 + 'px'};
  position: relative;
  float: right;
  width: 55%;
  margin: 0;
  right: ${props => props.toggle ? (-window.innerWidth * 0.55) + 21 + 'px' : 0};
  background: #111117f5;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);
  z-index: 1;
  transition: all cubic-bezier(0.63, 0.13, 0.01, 0.99) 500ms;

  @media (max-width: 1100px) {
    width: 45%;
  }

  @media (max-width: 900px) {
    width: 35%;
  }
`

const CollapseButton = styled.div`
  width: 20px;
  height: 150px;
  border-radius: 3px;
  background: #1D2133CC;
  position: relative;
  transform: translateY(-50%);
  top: 47%;
  left: 5px;
  cursor: pointer;

  &>svg{
    top: 50%;
    left: 45%;
    fill: white;
    position: relative;
    transform: translate(-50%,-50%);
    width: 15px;
  }
`

export default class RefugeeRoute_textArea extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      collapseToggle : false
    }
  }

  render(){
    // mapbox nav position
    this.state.collapseToggle ? $('.mapboxgl-ctrl-top-right').css('right','2%') : $('.mapboxgl-ctrl-top-right').css('right','57%');


    return(
      <Wrapper toggle={this.state.collapseToggle}>
        <CollapseButton onClick={() =>this.setState({collapseToggle: !this.state.collapseToggle}) }><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M190.4 354.1L91.9 256l98.4-98.1-30-29.9L32 256l128.4 128 30-29.9zm131.2 0L420 256l-98.4-98.1 30-29.9L480 256 351.6 384l-30-29.9z"/></svg></CollapseButton>
      </Wrapper>
    )
  }
}
