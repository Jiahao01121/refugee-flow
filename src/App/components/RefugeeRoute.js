import React from 'react';
import styled from 'styled-components';
import { get_routeDeath, get_routeIBC } from './../api';
import * as _ from 'underscore';
import RefugeeRoute_titleGroup from './RefugeeRoute_titleGroup';
import RefugeeRoute_textArea from './RefugeeRoute_textArea';
import RefugeeRoute_map from './RefugeeRoute_map';
import RefugeeRoute_map_popup from './RefugeeRoute_map_popup';

export default class RefugeeRoute extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        loading: true,
        currentRouteName: _.find(["Eastern Mediterranean","Central Mediterranean","Western Mediterranean","Western Balkans","Eastern Land Borders","Western African","Others" ],d => d.replace(' ','') === props.match.params.arg),
        banned_category: null,
        clicked_datapoint: null,
        clickedPointRemoved: false,
    }
    this.checkCurrentRouteName = this.checkCurrentRouteName.bind(this);
    this.changeRouteManager = this.changeRouteManager.bind(this);
    this.passBannedCategoryManager = this.passBannedCategoryManager.bind(this);
    this.passClickedPointManager = this.passClickedPointManager.bind(this);
    this.passRemoveClickedPointManager = this.passRemoveClickedPointManager.bind(this);
    this.banned_category = [];
  }

  componentDidMount () {
    this.fetchRefugeeRoutes();
  }

  fetchRefugeeRoutes = () => {
    get_routeDeath().then( d => {
      get_routeIBC().then( _d => {
        this.setState({route_death : d,route_IBC : _d,loading: false});
        this.checkCurrentRouteName(_.clone(_d));
      })
    })
  }

  checkCurrentRouteName(data){
    for (var route in data) {
      if(route.replace(' ','') === this.props.match.params.arg){
        this.setState({currentRouteName: route})
      }
    }
  }

  changeRouteManager(name){
    this.setState({currentRouteName : name});
  }

  passBannedCategoryManager(category){
    if(_.find(this.banned_category,d => d === category)){
      for (var i = this.banned_category.length -1; i >= 0 ; i--) {
        if(this.banned_category[i] === category){
          this.banned_category.splice(i, 1);
        }
      }
    }else{
      this.banned_category.push(category);
    }

    this.setState({banned_category : this.banned_category});
  }

  passClickedPointManager(point){
    this.setState({clicked_datapoint: JSON.stringify(point), clickedPointRemoved: false});
  }

  passRemoveClickedPointManager(){
    console.log('removed point manager called');
    this.setState({clickedPointRemoved: true},()=>{
    })
  }

  render() {
    const map = <RefugeeRoute_map
      data = {this.state.route_death}
      currentRouteName = {this.state.currentRouteName}
      banned_category = {this.state.banned_category}
      passClickedPointManager = {this.passClickedPointManager}
      passRemoveClickedPointManager = {this.passRemoveClickedPointManager}
    />

    const map_popup = <RefugeeRoute_map_popup/>

    const title = <RefugeeRoute_titleGroup
      currentRouteName = {this.state.currentRouteName}
      changeRouteManager = {this.changeRouteManager}
      passBannedCategoryManager = {this.passBannedCategoryManager}
    />

    const textArea = <RefugeeRoute_textArea
      selected_data = {this.state.clicked_datapoint}
      clickedPointRemoved = {this.state.clickedPointRemoved}
    />
    return(
      <div>
        {this.state.route_death && title}
        {this.state.route_death && map}
        {this.state.route_death && map_popup}
        {this.state.route_death && textArea}
      </div>
    )
  }
}
