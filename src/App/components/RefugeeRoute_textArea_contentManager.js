import React from 'react';
import styled, { css } from 'styled-components';
import RefugeeRoute_textArea_content_basicInfo from './RefugeeRoute_textArea_content_basicInfo';
import RefugeeRoute_textArea_content_ibcCountry from './RefugeeRoute_textArea_content_ibcCountry';
import RefugeeRoute_textArea_content_currentSelectedPoint from './RefugeeRoute_textArea_content_currentSelectedPoint';
export default class RefugeeRoute_textArea_contentManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selected_dataPoint : props.selected_dataPoint
    }

    this.currentTab = props.currentTab;
    this.switchingContent = this.switchingContent.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.currentTab = nextProps.currentTab;
    this.setState({selected_dataPoint: nextProps.selected_dataPoint})
  }
  switchingContent(){
    if(this.currentTab === 1){
      return <RefugeeRoute_textArea_content_basicInfo/>
    }
    else if(this.currentTab === 2){
      return <RefugeeRoute_textArea_content_ibcCountry/>
    }
    else if(this.currentTab === 3){
      return <RefugeeRoute_textArea_content_currentSelectedPoint selected_dataPoint={this.state.selected_dataPoint}/>
    }
  }
  render(){
    return this.switchingContent();
  }
}
