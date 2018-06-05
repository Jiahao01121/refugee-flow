import React from 'react';
import styled, { css }from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #10101470;
  z-index: 20;
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
  top: 443px;
  left: 190px;
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
  top: 600px;
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
  top: 600px;
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
  top: 600px;
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

class Annotation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <Wrapper>
        <RegionAnnotation> Region Selector </RegionAnnotation>
        <FilterAnnotation>Filter</FilterAnnotation>
        <TimelineAnnotation>Timeline Controller</TimelineAnnotation>
        <Stats1Annotation>Asylum Accepted Rate</Stats1Annotation>
        <Stats2Annotation>Fake annotation name</Stats2Annotation>
        <Stats3Annotation>Fake annotation name</Stats3Annotation>
      </Wrapper>
    )
  }
}

export default Annotation
