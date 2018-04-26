import React from 'react';

import {Chart} from './styledComponents/AsyApplicationChartContainer.styled'
import AsyApplicationChart from './AsyApplicationChart'

import * as d3 from 'd3';
import $ from "jquery";

class AsyApplicationChartContainer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      margin: {top: 20, right: 10, bottom: 30, left: 30},
      data : this.props.data,
      currentYear : this.props.currentYear,
      width : 0,
      height : 0,
      chartData : []
    }

    this.processData = this.processData.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      currentYear: nextProps.currentYear
    })
  }

  componentDidMount(){
    this.setState({
      width : $(this.mount).width() - this.state.margin.left - this.state.margin.right,
      height : $(this.mount).height() - this.state.margin.top - this.state.margin.bottom,
    })

    this.processData(this.state.data,this.state.currentYear);
  }

  processData(data,currentYear){
    console.count('process chart data called');
    //if receives data is not an empty array
    if(data.length >0){

      //shallow copy
      const _data = JSON.parse(JSON.stringify(data));

      _data.forEach(d =>{
        // loop through all the current data.
        for (var year in d) {

          let eachYear = d[year];

          // get general num
          for (var quater in eachYear) {
            eachYear[quater] = eachYear[quater].reduce((a, c) => {
              return {
                Value:a.Value + c.Value
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

      // pass data to state
      const yearList = Object.keys(_data[0]);
      const currentData = _data[0][yearList[currentYear]];
      this.setState({
        chartData : currentData
      })
    }

  }

  renderChart(){
    if(this.state.data.length != 0 && this.state.chartData.length != 0){
      return(<AsyApplicationChart {...this.state}/>)
    }
  }



  render(){


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
