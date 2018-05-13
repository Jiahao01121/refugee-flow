import React from 'react';
import styled, { css } from 'styled-components';

import AsyApplicationChart from './AsyApplicationChart'

import * as d3 from 'd3';
import $ from "jquery";

const Chart = styled.div`
    width: 90%;
    left: 5%;
    ${'' /* background: #0000ff1f; */}
    height: 75%;
    position: absolute;
    bottom: 11%;

    &:after{
      background-image: url(./assets/chartLegend_icon.png);
      background-size: 90px 10px;
      display: inline-block;
      width: 90px;
      height: 10px;
      content: "";
      bottom: -5px;
      left: 7%;
      position: absolute;
    }
`


class AsyApplicationChartContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      margin: {top: 20, right: 20, bottom: 30, left: 30},
      data : this.props.data,
      currentYear : this.props.currentYear,
      currentCountry: this.props.currentCountry,
      width : 0,
      height : 0,
      chartData : []
    }

    this.loadingManager = this.props.loadingManager;
    this.chartMode = this.props.chartMode,

    this.processData = this.processData.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.callGMountTransition = this.callGMountTransition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      currentYear: nextProps.currentYear,
      currentCountry: nextProps.currentCountry
    })
    this.chartMode = nextProps.chartMode;
    this.loadingManager = nextProps.loadingManager;
    this.processData(nextProps.data,nextProps.currentYear,this.chartMode);
  }

  componentDidMount(){

    this.setState({
      width : $(this.mount).width() - this.state.margin.left - this.state.margin.right,
      height : $(this.mount).height() - this.state.margin.top - this.state.margin.bottom,
    })

    this.processData(this.state.data,this.state.currentYear,this.chartMode);

  }

  processData(data,currentYear,mode){
    console.log('processData Caleed');
    // console.log(this.state.currentCountry);
    // console.log(currentYear);


    if(data.length >0){ //if receives data is not an empty array

      //shallow copy
      const _data = JSON.parse(JSON.stringify(data));

      _data.forEach(d =>{
        // loop through all the current data.
        for (var year in d) {

          let eachYear = d[year];

          // get general num
          for (var quater in eachYear) {
            eachYear[quater] = eachYear[quater].reduce((a, c) => {

              if(this.state.currentCountry === 'GLOBAL'){
                return {Value:a.Value + c.Value}
              }else{
                return c.Origin.toUpperCase() === this.state.currentCountry ? {Value:a.Value + c.Value} : {Value:a.Value+0}
              }
            }, {Value: 0})
          }
          // object format to array format
          d[year] = (() =>{
              let obj_to_array = [];

              for (var quater in eachYear) {
                obj_to_array.push(eachYear[quater].Value);
              }
              return obj_to_array;
          })()

        }
      })

      if(mode === 1){
        // pass data to state
        const yearList = Object.keys(_data[0]);
        const currentData = _data[0][yearList[currentYear]];
        this.setState({
          chartData : currentData
        })
      }
      else if (mode ===2) {
        const allData = []
        for (var year in _data[0]) {
          allData.push(
            _data[0][year][0],
            _data[0][year][1],
            _data[0][year][2],
            _data[0][year][3]
          )
        }
        console.log(allData);
        console.count('process chart data called - all');
        this.setState({
          chartData : allData
        })
      }

    }
  }



  renderChart(){
    console.count('renderChart called');
    if(this.state.data.length != 0 && this.state.chartData.length != 0){
      console.log("renderchart correctly");
      return (<AsyApplicationChart {...this.state} ref = {(gMount) => {return this.gMount = gMount }}/>)
    }
  }

  callGMountTransition(){
      if(this.gMount != undefined){

        this.gMount.drawDataontoChart(this.state.chartData)

        //x axis transition
        this.chartMode === 2
        ? this.gMount.x.domain(['2010','2018'])
        : this.gMount.x.domain(this.gMount.quaterList)
        this.gMount.xAxisGroup
          .transition()
          .duration(1700)
          .call((g)=>{
            this.gMount.customXaxis(g)
          })

        //y axis transition
        this.gMount.y.domain([0,d3.max(this.state.chartData)]).nice();
        this.gMount.yAxisGroup
          .transition()
          .duration(1700)
          .call((g)=>{
            this.gMount.customYaxis(g)
          })
          .on('start',() =>{
            d3.select('#asy_app_chart_baseLine')
            .transition()
            .duration(400)
            .attr("stroke", "#3b3a3e")
            .attr('stroke-width',1)

            d3.select('#asy_app_y_axis_title').remove();

            d3.select('#asy_app_y_axis_title_indent')
            .transition()
            .duration(400)
            .attr('x1',0)
            .attr('id','');
          })
          .on('end',function(){
            d3.select('#asy_app_chart_baseLine')
              .transition()
              .duration(1000)
              .attr('stroke','#7f7f7f')
              .attr('stroke-width',2)
          });
      }
  }

  render(){

    this.callGMountTransition();

    return(
      <Chart>
        <svg width='100%' height='100%' ref={(mount) => {return this.mount = mount }}>
          {this.renderChart()}
        </svg>
      </Chart>
    )

  }
}

export default AsyApplicationChartContainer;
