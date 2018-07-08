import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';
import * as warDict from '../data/warDictionary';
import { ScaleLoader } from 'react-spinners';
import AsyApplicationChartContainer from './AsyApplicationChartContainer';

import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './styledComponents/LoadingBarWrapper.styled';

const Background = styled.div`
  width: 25%;
  background: #0f1015f7;
  height: 100%;
  position: absolute;
  right: 0;
  top: 40px;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);
  display: flex;
  flex-direction: column;
`
const Title = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 100;
  color: white;
  margin-top: 15px;
  margin-left: 5%;
  display: inherit;
  cursor: pointer;
  z-index: 5;

  @media (max-width: 1245px) {
    font-size: 16px;
  }
  &:after{
    background-image: url(./assets/title_icon.png);
    background-size: 14px 14px;
    display: inline-block;
    width: 14px;
    height: 14px;
    content: "";
    right: -5px;
    position: relative;
  }

  &:before{
    content: 'Asylum application submissions over time';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    top: 45px;
  }
`
const ButtonWrapper = styled.div`
  display: inherit;
  justify-content: flex-start;
  height: 40px;

  @media (max-height: 599px) {
    margin: -5px 0 0 5%;
  }
  @media (max-height:749px) and (min-height: 600px) {
    margin: 10px 0 0 5%;
  }
  @media (min-height: 750px) {
    margin: 10px 0 0 5%;
  }
  @media (max-width: 1210px) {
    margin: 20px 0 0 5%;
  }


`
const CurrentYearButton = styled.button`
  display: inherit;
  width: 50%;
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  background: none;
  border: none;
  margin: 0px;
  text-decoration : ${props => props.selected == 1 ? 'underline' : 'none'};
  padding: 0;

  &::after{
    content: ${ props => "'" + props.currentYear + "'" };
    color: white;
    font-weight: 700;
    font-size: 9px;
    margin-left: 7px;
    text-decoration: underline;
    text-decoration-color: #0f1015f7;
  }

  @media (max-width: 1210px) {
    width: 70%;
  }
`
const AllYearButton = styled.button`
  display: inherit;
  width: 50%;
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  background: none;
  border: none;
  margin: 0px;
  text-decoration : ${props => props.selected == 2 ? 'underline' : 'none'};
  padding: 0;
`

class AsyApplicationContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loadingStatus: true,
      loadingText : 'Loading...',
      buttonMode : 1,
    }
    this.data = [];
    this.currentYear = this.props.currentYear;
    this.currentCountry = this.props.currentCountry;
    this.loadingManager = this.props.loadingManager;
    this.renderAsyAppContainer = this.renderAsyAppContainer.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  componentDidMount(){

    const url = 'http://' + window.location.hostname + ':2700' + '/data/asy_application_all';
    this.fetchData(url).then(d =>{
      this.data = d;
      this.setState({ loadingStatus: false })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.currentYear = nextProps.currentYear;
    this.currentCountry = nextProps.currentCountry;
    this.loadingManager = nextProps.loadingManager;
  }

  fetchData(url){
    const request = new Request( url, {
      method: 'GET',
      cache: 'force-cache'
    });
    return(
      fetch(request).then(res => res.json()).then(d =>{
        return d
      })
    )
  }

  renderAsyAppContainer(){
    if( this.data.length > 0 ){

      return (
        <AsyApplicationChartContainer
          currentYear={ this.currentYear }
          currentCountry = { this.currentCountry }
          data={this.data}
          loadingManager={this.loadingManager}
          ref={(ChartContainerMount) => {return this.ChartContainerMount = ChartContainerMount }}
          chartMode = {this.state.buttonMode}
        />
      )
    }
  }

  buttonClick(i){
    this.setState({
      buttonMode: i
    })
  }

  render(){

    return(
      <Background>
        <Title onClick={() => d3.select('.annotation-wrapper').style('display','block').transition().delay(10).style('opacity','1')}>{'Total Asylum Application - ' + this.currentCountry.charAt(0).toUpperCase() + this.currentCountry.toLowerCase().slice(1)} </Title>
        <ButtonWrapper>
          <CurrentYearButton onClick ={() => this.buttonClick(1)}     selected = {this.state.buttonMode} currentYear = {'201'.concat(this.currentYear)}>SHOW CURRENT YEAR</CurrentYearButton>
          <AllYearButton     onClick ={() => this.buttonClick(2)}     selected = {this.state.buttonMode}>SHOW ALL YEARS   </AllYearButton>
        </ButtonWrapper>

        <LoadingDivWrapper loading={this.state.loadingStatus}  leftPercentage='50%' marginTop = '-60'>
          <LoaderGraphWrapper>
            <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
          </LoaderGraphWrapper>
          <LoadingIndicator>
            {this.state.loadingText}
          </LoadingIndicator>
        </LoadingDivWrapper>

        {this.renderAsyAppContainer()}
      </Background>
    )

  }

}

export default AsyApplicationContainer;
