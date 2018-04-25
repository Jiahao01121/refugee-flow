import React from 'react';
import styled, { css } from 'styled-components';

import * as warDict from '../data/warDictionary';

import * as _ from 'underscore';
import { ScaleLoader } from 'react-spinners';
import AsyApplicationChartContainer from './AsyApplicationChartContainer'

import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './LoadingBarWrapper';

class AsyApplicationContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loadingStatus: true,
      loadingText   : 'Fetching data from the server...',
    }
    this.data = [];
    this.currentYear = this.props.currentYear;

    this.renderAsyAppContainer = this.renderAsyAppContainer.bind(this);
  }

  componentDidMount(){

    const url = 'http://' + window.location.hostname + ':2700' + '/data/asy_application_all';

    this.fetchData(url).then(d =>{
      this.data = d;
      this.setState({
        loadingStatus: false
      })
    })
  }


  componentWillReceiveProps(nextProps) {
    this.currentYear = nextProps.currentYear;
  }


  fetchData(url){
    const request = new Request( url, {method: 'GET', cache: true});
    return(
      fetch(request).then(res => res.json()).then(d =>{
        return d
      })
    )
  }

  renderAsyAppContainer(){
    if( this.data.length > 0 ){

      return (
        <AsyApplicationChartContainer currentYear={ this.currentYear } data={this.data}/>
      )
    }
  }

  render(){
    const Background = styled.div`
      width: 25%;
      background: #15151C;
      height: 100%;
      position: absolute;
      right: 0;
      top: 60px;
      box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);`

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
        content: 'description: Lorem ipsum dolor sit amet, consectetuer Lorem ipsum dolor sit amet, consectetue.';
        font-weight: 300;
        color: white;
        font-size: 12px;
        position: absolute;
        width: 320px;
        top: 35px;
      }
    `
    return(
      <Background>
        <Title>Total Asylum Application</Title>
        <LoadingDivWrapper loading={this.state.loadingStatus}  leftPercentage='50%' marginTop = '-60'>
          <LoaderGraphWrapper>
            <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
          </LoaderGraphWrapper>
          <LoadingIndicator>{this.state.loadingText}</LoadingIndicator>
          </LoadingDivWrapper>

        {this.renderAsyAppContainer()}
      </Background>
    )

  }
}

export default AsyApplicationContainer;
