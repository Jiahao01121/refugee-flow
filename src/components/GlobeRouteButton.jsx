import React from 'react';
import styled, { css , keyframes } from 'styled-components';
import * as _ from 'underscore';
import * as d3 from 'd3';
import { get_routeCountryList , get_routeCrossingCount } from './../utils/api';
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import RefugeeRoute from './RefugeeRoute'


const Icon = styled.img`
  position: absolute;
  width: 100px;
  left: 130px;
  top: 270px;
  cursor: pointer;
  opacity: .6;
  transition: all 300ms;
  z-index: 2;
  &:hover{
    opacity: 1;
  }
`
const Icon_text = styled.p`
  font-weight: 300;
  color: white;
  font-size: 10px;
  position: absolute;
  left: 163px;
  top: 328px;
  -webkit-transition: opacity 500ms,top 300ms;
  transition: opacity 500ms,top 300ms;
  opacity: 0.5;
  font-family: 'Roboto';
  z-index: 2;
`
const Icon_popup = styled.div`
  position: absolute;
  left: 145px;
  top: 280px;
  width: 250px;
  height: 200px;
  background-color: #1e1e29e0;
  border-radius: 5px;
  z-index: 1;
`
const Icon_popup_exit = styled.p`
  color: white;
  font-family: 'Helvetica';
  font-size: 14px;
  font-weight: 900;
  position: absolute;
  right: 13px;
  top: -8px;
  opacity: 0.5;
  transition: all 300ms;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
`
const Icon_popup_title = styled.p`
  font-family: 'Roboto';
  font-size: 16px;
  color: #ececec;
  margin: 0;
  position: absolute;
  left: 70px;
  top: 15px;
`
const Icon_popup_subtitle = styled.p`
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 11px;
  line-height: 1.4;
  color: white;
  position: absolute;
  left: 70px;
  top: 31px;
  margin-right: 20px;
`
const Route_list = styled.div`
  width: 94%;
  margin: 0 3%;
  height: 190px;
  position: absolute;
  bottom: 10px;
  overflow-x: scroll;

  &::-webkit-scrollbar{
    width: 1px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #5a5a61;
    -webkit-border-radius: 4px;
  }
`
const Route_list_title = styled.p`
  color: white;
  left: 20px;
  position: absolute;
  top: 70px;
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 10px;
`
const Individual_route_listItem = styled.div`
  width: 94%;
  height: 50px;
  background: rgba(42, 42, 56, 0.6);
  margin: 7px 3%;
  cursor: pointer;
  transition: all 300ms;
  border: 1px rgba(50, 50, 74, 0.38) solid;
  &:hover{
    background: rgba(55, 55, 76, 1);

  }
`
const Individual_route_listItem_title = styled.p`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 300;
  color: white;
  position: relative;
  margin: 0;
  transform: translateY(-50%);
  left: 5px;
  top: 15px;
  text-shadow: 4px 2px 9px #909698a6;
`
const Individual_route_listItem_crossCount = styled.p`
    font-family: 'Roboto';
    font-size: 12px;
    font-weight: 300;
    color: white;
    position: relative;
    margin: 0;
    transform:translateY(-52%);
    left: 5px;
    top: 16px;
    text-align: left;
  &>em{
    font-weight: 800;
  }
`
const Click_note = styled.p`
  font-family: 'Roboto';
  font-size: 9px;
  font-weight: 300;
  color: white;
  position: relative;
  -webkit-text-decoration: underline;
  text-decoration: underline;
  right: 5px;
  text-align: right;
  top: -11px;
`

class GlobeRouteButton extends React.Component {

  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      data: [],
      cross_count : [],
      popup_toggle: false,
    };
    this.country = props.country;
    this.history = props.history;
    this.render_route_list = this.render_route_list.bind(this);
  }

  componentDidMount(){
    // get Data
    get_routeCountryList().then( d => {
      d.push({'country':'GLOBAL',route:[ 'Eastern Mediterranean','Central Mediterranean','Western Mediterranean','Western Balkans','Eastern Land Borders','Western African','Others']})
      this.setState({data: d});
    })
    get_routeCrossingCount().then(d => this.setState({ cross_count: d }));

  }

  componentWillReceiveProps(nextProps) {
    this.country = nextProps.country;
    this.history = nextProps.history;
  }

  render_route_list(){
    if(!this.state.popup_toggle) {
      d3.select('.route_popup')
        .transition()
        .duration(10)
        .style('opacity',0)
        .on('end',() =>d3.select('.route_popup').style('width','250px').style('height','200px').style('display','none'))
        .on('interrupt',() => d3.select('.route_popup').style('width','250px').style('height','200px').style('display','none'));
    }
    else if(this.state.popup_toggle) {
      d3.select('.route_popup').style('display','block')
      d3.select('.route_popup')
        .style('width','250px')
        .style('height','200px')
        .transition()
        .duration(400)
        .ease(d3.easeCircle)
        .style('opacity',1)
        .style('width','350px')
        .style('height','290px')
    }

    const list_d = _.find(this.state.data,d => d.country === this.country );
    const jsx_arr = [];

    list_d.route.forEach((d,i) =>{

      jsx_arr[i] = (
        <Individual_route_listItem key={'route_item_' + i}
          onClick={() =>
            {
              // this.history.push('/route/'+d.replace(' ',''))
              window.open('/route/'+d.replace(' ',''),'_self')
            }}>
          <Individual_route_listItem_title>{d + ' Route'}</Individual_route_listItem_title>
          <Individual_route_listItem_crossCount>Total Corssing - <em>{ d3.format(',')(_.find(this.state.cross_count, _d => _d.route === d) && _.find(this.state.cross_count, _d => _d.route === d).total_cross) }</em> </Individual_route_listItem_crossCount>
          <Click_note>Click for more...</Click_note>
        </Individual_route_listItem>)
    })
    return jsx_arr;
  }

  render(){

    return(
      <div>
        <Icon_popup className = 'route_popup' toggle = {this.state.popup_toggle}>
          <Icon_popup_exit onClick={() => this.setState({popup_toggle:false}) }>x</Icon_popup_exit>
          <Icon_popup_title>Refugee Flee Route - {this.country.charAt(0).toUpperCase() + this.country.toLowerCase().slice(1)}</Icon_popup_title>
          <Icon_popup_subtitle> people can’t get asylum application through or dont know how to. Include illegal border crossing(IBC). </Icon_popup_subtitle>
          <Route_list_title>Involved Routes</Route_list_title>
          <Route_list>{(() =>{if(this.country && this.state.data.length > 0 ){return this.render_route_list()}})()}</Route_list>
        </Icon_popup>
        <Icon src='./assets/route_icon.svg'
          onClick={() => this.setState({popup_toggle:!this.state.popup_toggle})}
        />
        <Icon_text>ROUTE</Icon_text>

      </div>
    )
  }
}
export default GlobeRouteButton;
