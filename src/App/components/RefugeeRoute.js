import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { get_routeDeath, get_routeIBC } from './../api';
import * as _ from 'underscore';
import RefugeeRoute_titleGroup from './RefugeeRoute_titleGroup';
import RefugeeRoute_textArea from './RefugeeRoute_textArea';
import RefugeeRoute_map from './RefugeeRoute_map';

export default class RefugeeRoute extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        loading: true,
        currentRouteName: null
    }
    this.checkCurrentRouteName = this.checkCurrentRouteName.bind(this);
    this.changeRouteManager = this.changeRouteManager.bind(this);
  }

  componentDidMount () {
    this.fetchRefugeeRoutes();
  }

  fetchRefugeeRoutes = () => {
    get_routeDeath().then( d => {
      get_routeIBC().then( _d => {
        this.setState({route_death : d,route_IBC : _d,loading: false,currentRouteName:'Eastern Mediterranean'});
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

  render() {
    return(
      <div>
        <RefugeeRoute_titleGroup
          currentRouteName = {this.state.currentRouteName}
          changeRouteManager = {this.changeRouteManager}
        />
        <RefugeeRoute_map/>
        <RefugeeRoute_textArea/>
      </div>
    )
  }
}
