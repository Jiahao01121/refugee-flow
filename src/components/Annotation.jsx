import React from 'react';
import styled from 'styled-components';
import $ from "jquery";
import * as _ from 'underscore';
import * as d3 from 'd3';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #12121fb5;
  z-index: 20;
  ${'' /* display: none; */}
  transition: all 400ms;
  opacity: 0;
  bottom: 0;
`
const TextWrapper = styled.div`
  margin-top: 40px;
  height: 100%;
  position: relative;
`
const Title = styled.p`
  opacity: .8;
  transition: all 400ms;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 400;
  color: #c5d3ff;
  position: absolute;
  top: 33px;
  left: 30px;
  background: #2b3dba;
  border-radius: 3px;
  padding: 15px 15px;
  box-shadow: 7px 9px 71px 5px rgb(29, 37, 82);
  cursor: pointer;
  width: 95%;
  text-align: center;
  z-index: 100;
  &:hover{
    opacity: 1;
    font-weight: 800;
  }
`
const RegionAnnotation = styled.p`
  position: absolute;
  top: 90px;
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
    content: 'Click to view conflict data regionally';
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
  top: 143px;
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
    content: 'Click to view conflicts only against civilians';
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
  top: 406px;
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
    content: 'Click on the year to view conflict data by chosen year';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 90px;
    top: 30px;
  }
`
const RoutePopupAnnotation = styled.p`
  position: absolute;
  top: 263px;
  left: 235px;
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
    content: 'Click to see associated refugee routes';
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
  bottom: 205px;
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
    content: 'Total fatalities for the selected year';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 25px;
  }
`
const Stats2Annotation = styled.p`
  position: absolute;
  bottom: 205px;
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
    content: 'Total civilian fatalities during the selected year';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 25px;
  }
`
const Stats3Annotation = styled.p`
  position: absolute;
  bottom: 205px;
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
    content: 'Total number of armed conflicts during the selected year';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 25px;
  }
`
const MapNavAnnotation = styled.p`
  position: absolute;
  top: 170px;
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
    content: 'Click to zoom in/out on points of interest on the globe';
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
  top: 240px;
  right: ${() => (window.innerWidth*.25 - window.innerWidth*.25*0.05 - 190) + 'px'};
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 300;
  font-style: italic;
  color: white;

  &:before{
    content: 'Total number of submitted asylum applicatons';
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 200;
    color: white;
    position: absolute;
    width: 150px;
    top: 30px;
  }
`

class Annotation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Wrapper className='annotation-wrapper' onClick={() => {d3.select('.annotation-wrapper').style('opacity','0'); _.delay(() => d3.select('.annotation-wrapper').style('display','none'), 400 )}}>
        <Title>Click anywhere to explore Refugee Flow</Title>
        <TextWrapper>
          <RegionAnnotation>Regions</RegionAnnotation>
          <FilterAnnotation>Filter</FilterAnnotation>
          <TimelineAnnotation>Timeline Controller</TimelineAnnotation>
          <RoutePopupAnnotation>Refugee Routes</RoutePopupAnnotation>
          <Stats1Annotation>Total Fatality</Stats1Annotation>
          <Stats2Annotation>Total Civilian Fatality</Stats2Annotation>
          <Stats3Annotation>Total Armed Conflicts</Stats3Annotation>
          <MapNavAnnotation>Map Navigation</MapNavAnnotation>
          <ChartAnnotation>Asylum Application Data</ChartAnnotation>
        </TextWrapper>
      </Wrapper>
    )
  }
}

export default Annotation;
