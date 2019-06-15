import React from 'react';
import * as d3 from 'd3';
import styled, { css } from 'styled-components';

import * as warDict from '../../data/warDictionary';

const TimelineWrapper = styled.div`
  position:absolute;
  z-index: 1;
  height: 300px;
  width: 100px;
  bottom:0;
  overflow-y: scroll;
  left: 30px;
  box-shadow: 25px 69px 126px -11px rgba(0,0,0,0.75);
  height: ${() => (window.innerHeight - 300) + 'px'};

  &::-webkit-scrollbar{
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }
  &::before{
    content: "Timeline";
    position: fixed;
    font-family: 'Ubuntu';
    font-size: 12px;
    font-weight: 700;
    color: white;
    margin-top: -2px;
    width: 98px;
    background: #111116;
    height: 20px;
    z-index: 1;
  }
`
const IndividualWrapper = styled.div`
  width: 40px;
  padding: 0px;
  height: 1px;
  background: white;
  cursor: pointer;
  margin-bottom: 150px;
  &:first-child{
    margin-top: 20px;
  }
`
const YearButton = styled.button`
  font-family: 'Roboto';
  font-size: 11px;
  font-weight: 400;
  color: white;
  border: 0;
  background: transparent;
  width: 50px;
  left: 45px;
  bottom: 6px;
  padding: 0;
  position: relative;
  cursor: pointer;

  &:hover{
    font-size: 13px;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  ${props => props.isSelected && css`
    color: #41edb8 !important;
    font-size: 14px !important;
    bottom: 4px !important;
  `}
`
const QuarterButton = styled.button`
  font-family: 'Roboto';
  font-size: 10px;
  font-weight: 200;
  color: white;
  border: 0;
  background: transparent;
  width: 50px;
  left: 20px;
  padding: 0;
  position: relative;
  cursor: pointer;
  text-align: left;
  margin-bottom: 9px;

  &::after{
    content: '';
    width: 10px;
    position: absolute;
    height: 1px;
    border-radius: 20px;
    background-color: #fff;
    top: 6px;
    left: -20px;
  }

  ${props => props.param === 'disabled' && css`
    opacity: .2;
  `}

  ${props => props.param === 'currentYear' && css`
    &:hover{
      opacity: 0.7;
      color: #41edb8;
      transition: all 0.3s ease;
    }
  `}

  ${props => props.param === 'currentYearSelected' && css`
    color: #41edb8;
    font-weight: 500;
    &:hover{
      opacity: 0.7;
      color: #41edb8;
      transition: all 0.3s ease;
    }
  `}
`

class Timeline extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      current_Selected_Quater: null,
      selectedYear : 2010
    }
  }

  quater_selected_check(num,year){
    if(year == this.props.currentYear){
      if(num === this.state.current_Selected_Quater){
        return 'currentYearSelected'
      }else{
        return 'currentYear'
      }
    }else{
      return 'disabled'
    }
  }

  renderYearItem(year) {


    return(
      <IndividualWrapper key= {year} className="individualWrapper">
        <YearButton
          isSelected = {this.checkYearClassName(year)}
          onClick= {() => {
            this.setState({current_Selected_Quater: null, selectedYear: year });
            this.props.onClickYear(year);
          }}
          onMouseOver= {(e) => {
            if(this.state.current_Selected_Quater != null){
              if(this.state.selectedYear == d3.select(e.target).text()){
                this.setState({current_Selected_Quater: null });
                this.props.onClickYear(year);
              }
            }
          }}>{year}
        </YearButton>

        <QuarterButton
          param = {this.quater_selected_check(1,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 1 });
            this.props.onClickQuater(1)
          }}
          >
          Quarter 1</QuarterButton>
        <QuarterButton
          param = {this.quater_selected_check(2,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() =>{
            this.setState({current_Selected_Quater: 2 });
            this.props.onClickQuater(2)
          }}
          >
          Quarter 2</QuarterButton>
        <QuarterButton
          param = {this.quater_selected_check(3,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 3 });
            this.props.onClickQuater(3)
          }}
          >
          Quarter 3</QuarterButton>
        <QuarterButton
          param = {this.quater_selected_check(4,year)}
          disabled = {this.checkQuaterDisabled(year)}
          onMouseOver= {() => {
            this.setState({current_Selected_Quater: 4 });
            this.props.onClickQuater(4)
          }}
          >
          Quarter 4</QuarterButton>
      </IndividualWrapper>
    )
  }

  checkYearClassName(year){
    if(year == this.props.currentYear){
      return true
    }else{
      return false
    }
  }

  checkQuaterDisabled(year){
    if(year != this.props.currentYear) return true
    else return false
  }

  render(){
    const TimelineItems = [];
    warDict.year.forEach( (d,i) => TimelineItems[i] = this.renderYearItem(d) );

    return(
        <TimelineWrapper className = 'TimelineWrapper'>
          {TimelineItems}
        </TimelineWrapper>
    )
  }
}

export default Timeline;
