import React from 'react';
import styled, { css } from 'styled-components';

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
  top: 60px;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);
`
const Title = styled.p`
  position: relative;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 100;
  color: white;
  margin-top: 0;
  left: 5%;
  top: 15px;

  &:after{
    background-image: url(./title_icon.png);
    background-size: 14px 14px;
    display: inline-block;
    width: 14px;
    height: 14px;
    content: "";
    bottom: 10px;
    right: 0px;
    position: relative;
  }

  &:before{
    content: 'Submitted asylum applications over time';
    font-weight: 300;
    color: white;
    font-size: 12px;
    position: absolute;
    width: 320px;
    top: 35px;
  }
`
const Legend = styled.img`
  position: absolute;
  bottom: 75px;
  margin: 0;
  right: 30px;
  width: 25%;
`
const CurrentYearButton = styled.button`
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  left: 20px;
  position: absolute;
  background: none;
  border: none;
  top: 13.5%;
  margin: 0px;
  text-decoration : ${props => props.selected == 1 ? 'underline' : 'none'};

  &::after{
    content: ${ props => "'" + '('+props.currentYear+')' + "'" };
    color: #7f7f7f;
    font-weight: 700;
    font-size: 10px;
    position: absolute;
    bottom: 4px;
    right: -23px;
  }
`
const AllYearButton = styled.button`
  cursor: pointer;
  font-family: 'Tajawal';
  font-weight: 300;
  font-size: 13px;
  color: #ffffff66;
  left: 211px;
  position: absolute;
  background: none;
  border: none;
  top: 13.5%;
  margin: 0px;
  text-decoration : ${props => props.selected == 2 ? 'underline' : 'none'}
`




class AsyApplicationContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loadingStatus: true,
      loadingText : 'Fetching data from the server...',
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
        <Title>{'Total Asylum Application - ' + this.currentCountry.charAt(0).toUpperCase() + this.currentCountry.toLowerCase().slice(1)} </Title>
        <CurrentYearButton onClick ={() => this.buttonClick(1)}     selected = {this.state.buttonMode} currentYear = {'201'.concat(this.currentYear)}>SHOW CURRENT YEAR</CurrentYearButton>
        <AllYearButton     onClick ={() => this.buttonClick(2)}     selected = {this.state.buttonMode}>SHOW ALL YEARS   </AllYearButton>

        <LoadingDivWrapper loading={this.state.loadingStatus}  leftPercentage='50%' marginTop = '-60'>
          <LoaderGraphWrapper>
            <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
          </LoaderGraphWrapper>
          <LoadingIndicator>{this.state.loadingText}</LoadingIndicator>
          </LoadingDivWrapper>

        {this.renderAsyAppContainer()}
        <Legend src="./chartLegend_icon.png" alt="Smiley face" />
      </Background>
    )

  }

}

export default AsyApplicationContainer;
