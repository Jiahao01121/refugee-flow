import React from 'react';
import * as d3 from 'd3';
import * as warDict from '../../data/warDictionary';

class AsyApplicationChart extends React.Component {
  constructor(props){
    super(props);

    this.margin = this.props.margin;
    this.width = this.props.width;
    this.height = this.props.height;
    this.chartData = this.props.chartData;

    this.drawChart = this.drawChart.bind(this);
    this.drawDataontoChart = this.drawDataontoChart.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount(){
    this.drawChart();
    // default 2010
    this.drawDataontoChart([40764, 39031, 45253, 45328]);
  }

  drawChart(){
      console.log('draw');

      //hard coded quaterList
      this.quaterList = ['q1','q2','q3','q4'];


      // setup scaler
      /****************** other options for Y axis scale  ******************
      * this.y = d3.scalePow().exponent(2)
        .domain([0,d3.max(this.chartData)]).range([this.height,0]);
      * this.y = d3.scaleLog()
        .domain([1000,d3.max(this.chartData)]).range([this.height,0])
        .base(10);
      **********************************************************************/
      this.x = d3.scalePoint()
        .domain(this.quaterList).range([0,this.width]);
      this.y = d3.scaleLinear()
        .domain([0,d3.max(this.chartData)]).range([this.height,0])
        .nice();

      //draw X axis
      this.customXaxis = (g) =>{
          g.call(d3.axisBottom(this.x)
            .tickFormat(function(d) {
              return d.toUpperCase();
            })
          );
          g.select('.domain').remove();
          g.selectAll('.tick text')
            .attr("dy", 10)
            .attr('fill','#7f7f7f')
            .style('font-family','Roboto')
            .style('font-weight',700)

          g.selectAll('.tick line')
            .attr('stroke','#7f7f7f')
            .attr("y2", 4)
            .attr('stroke-width',2);
          g.selectAll(".tick:first-of-type line").remove()
          g.selectAll(".tick:last-of-type line").remove()
        }
      this.xAxisGroup = d3.select(this.mount)
        .append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(this.customXaxis)

      //draw Y axis
      this.customYaxis = (g) =>{

        var s = g.selection ? g.selection() : g;
        g.call(
          d3.axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(d3.format(".2s"))
        );

        s.select(".domain").remove();
        s.selectAll(".tick line").attr("stroke", "#3b3a3e")

        s.selectAll(".tick text")
          .attr("x", -8)
          .attr("dy", 4)
          .attr('fill','#7f7f7f')
          .style('font-family','Roboto')
          .style('font-weight',700)
          .attr("text-anchor", "end");

        if(s == g){
          // only excute on the initial chart rendering

          s.selectAll(".tick:first-of-type text").remove();

          s.selectAll(".tick:first-of-type line")
            .attr('stroke','#7f7f7f')
            .attr('stroke-width',2)
            .attr('id','asy_app_chart_baseLine');

          s.selectAll(".tick:last-of-type")
            .append("text")
            .attr('id','asy_app_y_axis_title')
            .attr("fill", "#7f7f7f")
            .style('font-family','Roboto')
            .style('font-weight',700)
            .attr('x',0)
            .attr("dy", 4)
            .attr("text-anchor", "start")
            .text("Application Count (case)");

          s.selectAll(".tick:last-of-type line")
            .attr('id','asy_app_y_axis_title_indent')
            .attr('x1',120);

        }else if(s !== g){
          // dealing w/ transition

          s.selectAll(".tick:last-of-type")
            .append("text")
            .attr('id','asy_app_y_axis_title')
            .attr("fill", "#7f7f7f")
            .style('font-family','Roboto')
            .style('font-weight',700)
            .attr('x',0)
            .attr("dy", 4)
            .attr("text-anchor", "start")
            .text("Application Count (case)");

          s.selectAll(".tick:last-of-type line")
          .attr('id','asy_app_y_axis_title_indent')
          .attr('x1',120)

          g.selectAll(".tick:first-of-type text").remove();
          g.selectAll(".tick text").attrTween("x", null).attrTween("dy", null)
        }
      }
      this.yAxisGroup = d3.select(this.mount)
        .append("g")
          .call(this.customYaxis)
  }

  drawDataontoChart(chartD){

    const svg_width = this.width;
    const svg_height = this.height;
    let currentDomain = this.quaterList;
    //hard coded year list for x axis
    let allDomain = ['2010Q1','2010Q2','2010Q3','2010Q4',
             '2011Q1','2011Q2','2011Q3','2011Q4',
             '2012Q1','2012Q2','2012Q3','2012Q4',
             '2013Q1','2013Q2','2013Q3','2013Q4',
             '2014Q1','2014Q2','2014Q3','2014Q4',
             '2015Q1','2015Q2','2015Q3','2015Q4',
             '2016Q1','2016Q2','2016Q3','2016Q4',
             '2017Q1','2017Q2','2017Q3','2017Q4',
             '2018Q1','2018Q2','2018Q3','2018Q4'];
    this.allYearQuater = allDomain;
    // setup x,y scaler base on chartD(passed from parent component)
    chartD.length > 4
    ? this.x = d3.scalePoint()
      .domain( allDomain ).range([0,this.width])
    : this.x = d3.scalePoint()
      .domain(this.quaterList).range([0,this.width]);

    this.y = d3.scaleLinear()
      .domain([0,d3.max(chartD)]).range([this.height,0])
      .nice();

    /********************
    * draw Asylum application line
    * - only draw once, if any changes happened, alterate "d" for line
    ********************/
    d3.selectAll('.dataLine')._groups[0].length >0
    ? d3.selectAll('.dataLine')
        .attr("d", d3.line()
          .x((d,i) => chartD.length > 4 ? this.x(allDomain[i]) : this.x(this.quaterList[i]) )
          .y( d => this.y(d) )
          .curve(d3.curveMonotoneX)(chartD)
        )
        .attr("stroke-dasharray", function(){ return this.getTotalLength() })
        .attr("stroke-dashoffset", function(){ return this.getTotalLength() })
        .transition()
        .duration(1500)
        .attr("stroke-dashoffset", 0)
    : d3.select(this.mount).append("path")
      .datum(chartD)
      .attr('class','dataLine')
      .attr("fill", "none")
      .attr("stroke", "#41edb8")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
      .attr("d",
        d3.line()
          .x((d,i) => this.x(this.quaterList[i]) )
          .y( d => this.y(d) )
          .curve(d3.curveMonotoneX)
          // .curve(d3.curveStepAfter)
      )
      .attr("stroke-dasharray", function(d){ return this.getTotalLength() })
      .attr("stroke-dashoffset", function(d){ return this.getTotalLength() })
      .transition()
      .duration(1500)
      .attr("stroke-dashoffset", 0)

    // wipe all dataPoint if there's any.
    d3.selectAll('.dataPoint')._groups[0].length >0 && d3.selectAll('.dataPoint').remove();
    // draw Asylum application point
    d3.select(this.mount)
      .selectAll('.dataPoint')
      .data(chartD)
      .enter()
      .append('circle')
      .attr('class','dataPoint')
      .attr("fill", "#41edb8")
      .attr("stroke", "#1b1f3a")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr('r',5)
      .attr('cx',(d,i) => chartD.length > 4 ? this.x(allDomain[i]) : this.x(this.quaterList[i]) )
      .attr('cy', d => this.y(d) )
      .on('mouseover', function(){
        const w = 170;
        const h = 53;
        // datapoint feedback
        d3.select(this)
          .transition()
          .duration(400)
          .attr('fill','#FF5764')
          .attr('r',8)

        d3.select(this.parentNode)
          .append('g')
          .attr('class','dataPoint_tooltips')
          .call((g) =>{

            g.append('rect')
              .attr('x',() => {
                if(svg_width - +d3.select(this).attr('cx') < w/2){
                  return +d3.select(this).attr('cx') - w;
                }
                else if(+d3.select(this).attr('cx') > w/2){
                  return +d3.select(this).attr('cx') - w/2;
                }
                else{
                  return +d3.select(this).attr('cx');
                }
              })
              .attr('y',() => {
                if(svg_height - +d3.select(this).attr('cy') < h){
                  return +d3.select(this).attr('cy') - h - 15
                }else{
                  return +d3.select(this).attr('cy') + 15
                }

              })
              .style('fill','#26242bb8')
              .attr('height',0)
              .transition()
              .duration(600)
              .attr('width',w)
              .attr('height',h)

            g.append('text')
              .attr('x',() =>{
                if(svg_width - +d3.select(this).attr('cx') < w/2){
                  return +d3.select(this).attr('cx') - w + 20;
                }
                else if(+d3.select(this).attr('cx') > w/2){
                  return +d3.select(this).attr('cx') - w/2 + 20;
                }
                else{
                  return +d3.select(this).attr('cx') + 20;
                }
              })
              .attr('y',() =>{
                if(svg_height - +d3.select(this).attr('cy') < h){
                  return +d3.select(this).attr('cy') - h - 15 + 40
                }else{
                  return +d3.select(this).attr('cy') + 15 + 40
                }
              })
              .text('Total application: '+ d3.format(".5s")(d3.select(this).datum()))
              .attr("fill", "#b9b7b7")
              .style('font-family','Roboto')
              .style('font-weight',400)
              .style('font-size','12px')
              .style('opacity',0)
              .transition()
              .duration(600)
              .style('opacity',1)
            g.append('text')
              .attr('x',() => {
                if(svg_width - +d3.select(this).attr('cx') < w/2){
                  return +d3.select(this).attr('cx') - w + 20;
                }
                else if(+d3.select(this).attr('cx') > w/2){
                  return +d3.select(this).attr('cx') - w/2 + 20;
                }
                else{
                  return +d3.select(this).attr('cx') + 20;
                }
              })

              .attr('y',() => {
                if(svg_height - +d3.select(this).attr('cy') < h){
                  return +d3.select(this).attr('cy') - h - 15 + 20
                }else{
                  return +d3.select(this).attr('cy') + 15 + 20
                }
              })
              .text( () =>{
                return "Year/Quarter: " +(
                    // chartD.indexOf(d3.select(this).datum()) > 4
                     allDomain[chartD.indexOf(d3.select(this).datum())].toUpperCase()
                    // : currentDomain[chartD.indexOf(d3.select(this).datum())]
                  )
              }
              )

              .attr("fill", "#b9b7b7")
              .style('font-family','Roboto')
              .style('font-weight',400)
              .style('font-size','12px')
              .style('opacity',0)
              .transition()
              .duration(600)
              .style('opacity',1)





          })

      })
      .on('mouseout',function(){
        // datapoint feedback
        d3.select(this)
          .transition()
          .duration(100)
          .attr('fill','#41edb8')
          .attr('r',5)

        d3.selectAll('.dataPoint_tooltips rect')
          .transition()
          .duration(200)
          .attr('height',0)
          .on('end',function(){
            d3.select('.dataPoint_tooltips').remove()
          })
          .on('interrupt',function(){
            d3.select('.dataPoint_tooltips').remove()
          })
      })

    // draw Asylum application avg line
    d3.selectAll('.asy-stats')._groups[0].length >0
    ? d3.selectAll('.asy-stats').call((g) =>{
      g.select('line')
      .transition()
      .duration(1000)
      .attr("y1",this.y(chartD.reduce((a,c) => a+c ) / 4))
      .attr("y2",this.y(chartD.reduce((a,c) => a+c ) / 4));

      g.selectAll('text:last-of-type').text( d3.format(".2s")( chartD.reduce((a,c) => a+c ) / 4 ) )

      g.selectAll('text')
      .transition()
      .duration(1000)
      .attr("y",this.y(chartD.reduce((a,c) => a+c ) / 4))


    })
    : d3.select(this.mount)
      .append('g')
      .attr('class','asy-stats')
      .call((g) =>{

        // draw avg
        g.append("line")
          .attr("stroke", "#41edb8")
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .attr("stroke-width", 1)
          .attr("x1", 0)
          .attr("x2",this.width)
          .attr("y1",this.y(chartD.reduce((a,c) => a+c ) / 4))
          .attr("y2",this.y(chartD.reduce((a,c) => a+c ) / 4));

        g.append("text")
          .attr('x',-10)
          .attr("y",this.y(chartD.reduce((a,c) => a+c ) / 4))
          .attr('dy',4)
          .text('Avg')
          .attr("fill",'#41edb8')
          .style('font-family','Roboto')
          .style('font-weight',400)
          .style('font-size','10px')
          .attr("text-anchor", "end");

        g.append("text")
          .attr('x',-10)
          .attr("y",this.y(chartD.reduce((a,c) => a+c ) / 4))
          .attr('dy',15)
          .text( d3.format(".2s")( chartD.reduce((a,c) => a+c ) / 4 ) )
          .attr("fill",'#41edb8')
          .style('font-family','Roboto')
          .style('font-weight',400)
          .style('font-size','10px')
          .attr("text-anchor", "end");
      })

  }

  render(){
    console.log("a");
    return(
      <g
        transform = {"translate(" + this.margin.left + "," + this.margin.top + ")"}
        ref={(mount) => {return this.mount = mount }}
        >

      </g>
    )

  }
}

export default AsyApplicationChart;
