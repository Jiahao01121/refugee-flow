import React from 'react';


import * as warDict from '../data/warDictionary';

import * as _ from 'underscore';
import { ScaleLoader } from 'react-spinners';
import AsyApplicationChartContainer from './AsyApplicationChartContainer';
import {Background, Title} from './styledComponents/AsyApplicationContainer.styled';

import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './styledComponents/LoadingBarWrapper.styled';

class AsyApplicationContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loadingStatus: true,
      loadingText   : 'Fetching data from the server...',
    }
    this.data = [];
    this.currentYear = this.props.currentYear;
    // this.loadingManager = this.props.loadingManager;
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
    // this.loadingManager = nextProps.loadingManager;
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
        <AsyApplicationChartContainer
          currentYear={ this.currentYear }
          data={this.data}
          // loadingManager={this.loadingManager}
        />
      )
    }
  }

  render(){

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
