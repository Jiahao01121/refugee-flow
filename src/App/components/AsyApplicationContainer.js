import React from 'react';


import * as warDict from '../data/warDictionary';

import * as _ from 'underscore';
import { ScaleLoader } from 'react-spinners';
import AsyApplicationChartContainer from './AsyApplicationChartContainer';
import { Background, Title, Legend, CurrentYearButton, AllYearButton } from './styledComponents/AsyApplicationContainer.styled';

import {LoadingDivWrapper, LoaderGraphWrapper, LoadingIndicator} from './styledComponents/LoadingBarWrapper.styled';

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
    this.loadingManager = nextProps.loadingManager;
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

    console.log(this.state.buttonMode);
  }

  render(){

    return(
      <Background>
        <Title>Total Asylum Application</Title>
        <CurrentYearButton onClick ={() => this.buttonClick(1)}     selected = {this.state.buttonMode}>SHOW CURRENT YEAR</CurrentYearButton>
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
