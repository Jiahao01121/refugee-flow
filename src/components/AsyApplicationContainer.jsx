import React from 'react';
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import { ScaleLoader } from 'react-spinners';
import AsyApplicationChartContainer from './AsyApplicationChartContainer';

import { LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator } from './LoadingBar';

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

  & ::selection {
    background: none;
    color: none;
    }
`;

const Title = styled.p`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 300;
  color: white;
  margin-top: 15px;
  margin-left: 5%;
  display: inherit;
  cursor: pointer;
  z-index: 5;
  transition: all 400ms;
  &:hover{
    color: #d7d7ead4;
  }

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
    font-weight: 100;
    color: white;
    font-size: 11px;
    letter-spacing: 0.7px;
    position: absolute;
    top: 43px;
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
  height: 30px;
  cursor: pointer;
  font-family: 'Ubuntu';
  font-weight: 400;
  font-size: 12px;
  padding: 0px 0px 0px 20px;
  background: #3f415845;
  border-radius: 3px;
  border: 1px solid;
  border-color: #3f41581c;
  transition: background 400ms,border-color 1000ms;
  color: white;
  margin-right: 5%;

  &:hover{
    background: #2b2c3c;
    border-color: #2e9493cc;
  }
  ${props => props.selected == 1 && css`
    background: #3f415894;
    border-color: #555875cf;
  `};
  &::after{
    content: ${ props => "'(" + props.currentYear + ")'" };
    color: white;
    font-weight: 700;
    font-size: 9px;
    margin-left: 7px;
    text-decoration: underline;
    text-decoration-color: #9ca6d6f7;
  }

  @media (max-width: 1210px) {
    width: 70%;
  }
`
const AllYearButton = styled.button`
  display: inherit;
  width: 40%;
  height: 30px;
  cursor: pointer;
  font-family: 'Ubuntu';
  font-weight: 400;
  font-size: 12px;
  padding: 0px 0px 0px 27px;
  background: #3f415845;
  border-radius: 3px;
  border: 1px solid;
  border-color: #3f41581c;
  transition: background 400ms,border-color 1000ms;
  color: white;
  &:hover{
    background: #2b2c3c;
    border-color: #2e9493cc;
  }
  ${props => props.selected == 2 && css`
    background: #3f415894;
    border-color: #555875cf;
  `};
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
    const url = `${window.location.protocol}//${window.location.host}/data/asy_application_all`;
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
        <Title onClick={() => d3.select('.annotation-wrapper').style('display','block').transition().delay(10).style('opacity','1')}>{'Total Asylum Application | ' + this.currentCountry.charAt(0).toUpperCase() + this.currentCountry.toLowerCase().slice(1)} </Title>
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