import React from 'react';
import styled, { css }from 'styled-components';
import $ from "jquery";
import * as _ from 'underscore';
import * as d3 from 'd3';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
  z-index: 20;
  ${'' /* display: none; */}
  transition: all 3000ms;
  opacity: 0;
  overflow-y: scroll;
`
const Title = styled.p`
  font-family: 'Roboto';
  font-size: 25px;
  font-weight: 500;
  color: white;
  margin-left: 310px;
  position: absolute;
  top: 22px;
`
const RegionAnnotation = styled.p`
  position: absolute;
  top: 140px;
  left: 310px;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;
  &:after{
    content: '';
    width: 40px;
    position: absolute;
    height: 1px;
    border-radius: 20px;
    background-color: #fff;
    top: 12px;
    left: -50px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const FilterAnnotation = styled.p`
  position: absolute;
  top: 191px;
  left: 180px;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 40px;
    position: absolute;
    height: 1px;
    border-radius: 20px;
    background-color: #fff;
    top: 12px;
    left: -50px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const TimelineAnnotation = styled.p`
  position: absolute;
  top: ${() =>{
    return $($('.years')[2]).position() ? $($('.years')[2]).position().top + 125 + 'px' : '1000000px';
    }};
  left: ${() =>{
    return $($('.years')[2]).position() ? $($('.years')[2]).position().left + 130 + 'px' : '100000px';
    }};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 20px;
    position: absolute;
    height: 1px;
    border-radius: 20px;
    background-color: #fff;
    top: 12px;
    left: -30px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 90px;
    top: 30px;
  }
`

const statsBoardAnnotationPositioning = (num) =>{
  const containerWidth = (window.innerWidth*.75) - 165 - 90;
  const statsBoardWidth = containerWidth/4;
  const marginWidth = containerWidth/20;
  if(num === 0){
    return marginWidth  + 255 + 'px'
  }
  else{
      return marginWidth + 255 + statsBoardWidth*num +( (containerWidth - (statsBoardWidth*3 + marginWidth*2) )/2 )*num + 'px'
  }
}
const Stats1Annotation = styled.p`
  position: absolute;
  bottom: 240px;
  left: ${statsBoardAnnotationPositioning(0)};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 1px;
    position: absolute;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
    top: 75px;
    left: 0px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const Stats2Annotation = styled.p`
  position: absolute;
  bottom: 240px;
  left: ${statsBoardAnnotationPositioning(1)};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 1px;
    position: absolute;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
    top: 75px;
    left: 0px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const Stats3Annotation = styled.p`
  position: absolute;
  bottom: 240px;
  left: ${statsBoardAnnotationPositioning(2)};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 1px;
    position: absolute;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
    top: 75px;
    left: 0px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const MapNavAnnotation = styled.p`
  position: absolute;
  top: 155px;
  right: 29%;
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 137px;
    position: absolute;
    height: 1px;
    border-radius: 20px;
    background-color: #fff;
    top: -10px;
    left: 0px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`
const ChartAnnotation = styled.p`
  position: absolute;
  top: 300px;
  right: ${() => (window.innerWidth*.25 - window.innerWidth*.25*0.05 - 190) + 'px'};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:after{
    content: '';
    width: 1px;
    position: absolute;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
    top: -35px;
    left: 0px;
  }
  &:before{
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`

class Introduction extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Wrapper className='introduction-wrapper'>
        <section className="explain-project">
          <p className="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <p className="author">— Patrick Farrell</p>
        </section>

        <section className="hero">
          <div className="background-image" styles="background-image: url(assets/img/hero.jpg);"></div>
          <a href="/conflict" className="btn">Launch Visualization</a>
        </section>
      </Wrapper>
    )
  }
}

export default Introduction
