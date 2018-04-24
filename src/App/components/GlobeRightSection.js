import React from 'react';
import styled, { css } from 'styled-components';

import * as warDict from '../data/warDictionary';

import * as _ from 'underscore';
import { ScaleLoader } from 'react-spinners';
import GlobeRSChart from './GlobeRSChart'

import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './LoadingBarWrapper';

class GlobeRightSection extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentSelection: [],
      loadingStatus: true,
      loadingText   : 'Fetching data from the server...',

    }

    this.currentYear = this.props.currentYear;
    this.data = [];
  }

  componentDidMount(){

    const url = 'http://' + window.location.hostname + ':2700' + '/data/asy_application_all';

    this.fetchData(url).then(d =>{
      this.data = d;
      this.setState({
        currentSelection: [ this.data[this.currentYear] ],
        loadingStatus: false
      })
    })
  }


  componentWillReceiveProps(nextProps) {
    this.currentYear = nextProps.currentYear;
    this.setState({currentSelection: [ this.data[this.currentYear] ] });
  }


  fetchData(url){
    const request = new Request( url, {method: 'GET', cache: true});
    return(
      fetch(request).then(res => res.json()).then(d =>{
        return d
      })
    )
  }

  render(){
    const Background = styled.div`
      width: 25%;
      background: #15151C;
      height: 100%;
      position: absolute;
      right: 0;
      top: 60px;
      box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);
    `
    console.log('rendee asdas das das');
    console.log(LoadingDivWrapper);
    return(
      <Background>
        <LoadingDivWrapper loading={this.state.loadingStatus}  leftPercentage='50%'>
          <LoaderGraphWrapper>
            <ScaleLoader color= {'#ffffff'} loading={this.state.loadingStatus}/>
          </LoaderGraphWrapper>
          <LoadingIndicator>{this.state.loadingText}</LoadingIndicator>
          </LoadingDivWrapper>

        <GlobeRSChart data={ this.state.currentSelection }/>
      </Background>
    )

  }
}

export default GlobeRightSection;
