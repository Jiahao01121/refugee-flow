import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import * as d3 from 'd3';
import * as _ from 'underscore';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  & > a:first-child{
    z-index: 100;
    font-family: 'Ubuntu',sans-serif;
    font-weight: 900;
    font-size: 18px;
    color: white;
    text-decoration: none;
    padding-left: 30px;
    position: fixed;
    z-index: 999;
    transition: top 1200ms, opacity 2500ms, filter 200ms;
    top: ${props => props.animation?'9px':'-300px'}
    opacity: ${props => props.animation?1:0}
    &:hover{
      filter:drop-shadow(0px 2px 8px #bebee4);
    }
  }

  & > a:first-child:after{
    content: 'A Comparitive Study on Conflicts and Refugee Movement';
    font-family: 'Ubuntu';
    font-weight: 100;
    color: white;
    opacity: ${props => props.animation?0.4:0}
    transition: 2400ms all;
    font-size: 11px;
    position: relative;
    left: ${props => props.animation?'20px':'-20px'};
    bottom: 1px;
    width: 300px;
    word-spacing: 3px;
  }
`
const Intro = styled.div`
  color: white;
  position: absolute;
  width: 30px;
  font-family: 'Ubuntu',sans-serif;
  cursor: pointer;
  z-index: 1000;
  top: ${props => props.animation?'14px':'-300px'};
  opacity: ${props => props.animation?1:0};

  ${props => !props.wikiOn
  ? css`
    transition: top 1200ms, opacity 2500ms, filter 200ms, right 400ms;
    right: 50px;
    font-weight: 500;
    font-size: 12px;
  `
  : css`
    transition: top 200ms, opacity 2500ms, filter 200ms, right cubic-bezier(0.73, 0.02, 0.58, 0.78) 800ms;
    right: ${() => window.innerWidth - 60 +'px'};
    top: 54px;
    font-weight: 900;
    font-size: 18px;
  `}



  &:hover{
    filter: drop-shadow(0px 2px 8px #bebee4);
  }

  &>svg{
    ${props => !props.wikiOn
    ? css`
      top: -4px;
      left: 30px;
    `
    : css`
      top: 0;
      left: 42px;
    `}

    fill: white;
    position: absolute;
    width: 20px;
  }
`
const IntroPage = styled.div`
  width: ${props => props.wikiOn ? '100%' : '0%'};
  height: 100%;
  bottom: 0;
  right: 0;
  z-index: 998;
  background: #1e1e2f;
  opacity: ${props => props.wikiOn ? '0.98' : '0'};
  transition: width cubic-bezier(0.73, 0.02, 0.58, 0.78) 800ms, opacity 400ms;
  position: absolute;
`
const Quote = styled.p`
  position: absolute;
  font-family: 'Playfair Display', serif;
  width: 60%;
  text-align: justify;
  top: ${props => props.animation?'40%':'37%'};
  opacity: ${props => props.animation?1:0};
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 30px;
  letter-spacing: 2px;
  line-height: 2;
  color: #ffffff;
  transition: top 2100ms,opacity 4300ms;
  z-index: 2;
  &::after{
    content: "- Filippo Grandi @ UN High Commissioner for Refugees";
    position: absolute;
    font-family: serif;
    font-size: 15px;
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0.5px;
    color: #ffffff;
    left: 0;
    bottom: ${props => props.animation?'-50px':'-150px'};
    opacity: ${props => props.animation?1:0};
    transition: bottom 2100ms,opacity 4300ms;
  }

  &>i{
    filter: ${props =>
      props.videoLoop
        ? 'blur('+ Math.abs(d3.randomNormal(0,1)()) +'px'+')'
        : 'blur(' + Math.abs(d3.randomNormal(0,1)()) + 'px'+ ')'
    };
    transition: filter 4000ms, color 5000ms;
    color:
    ${props =>{
      const colorArr = ['pink','#cf2d13','#424866','#42664bb0']
      if(props.videoLoop){
        const index = Math.floor(Math.random()*3);
        return colorArr[index];
      }else{
        const index = Math.floor(Math.random()*3);
        return colorArr[index];
      }
    }};
  }
`
const Section = styled.section`
  height: 100vh;
  &>video{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    transition: opacity 5500ms, filter 1500ms;
    opacity: ${props => props.animation?1:0};
    filter: ${props =>
      props.videoLoop
        ? 'blur('+ Math.abs(d3.randomNormal(0,10)()) +'px'+') hue-rotate(0deg) contrast(1.2) saturate(0.8) brightness(0.5);'
        : 'blur(' + Math.abs(d3.randomNormal(0,10)()) + 'px'+ ') hue-rotate(0deg) contrast(1.2) saturate('+d3.randomUniform(1, 2.5)()+') brightness('+d3.randomUniform(0.4, 1.2)()+');'
    };

    @media (max-width:1590px) and (min-width: 1270px) {
      width: 140%;
    };

    @media (max-width: 1269px) {
      width: 180%;
    };
  }
`
const BoxShadow = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1;
  box-shadow: 1px 10px 950px 230px rgba(1, 14, 23, 0.9);
`
const Launch = styled.a`
  text-align: center;
  text-decoration: none;
  z-index: 100;
  position: absolute;
  left: 50%;
  bottom: ${props => props.animation?'70px':'200px'};

  opacity: ${props => props.animation?1:0};
  transition: background 2000ms, bottom 3000ms,opacity cubic-bezier(1, 0.03, 0.48, 1.01) 3500ms;
  transform: translateX(-50%);
  font-family: 'Ubuntu';
  font-size: 17px;
  color: white;
  background: ${props => props.videoLoop?'rgba(234,86,0,.95)':'rgba(234, 86, 0,.75)'};
  padding: 15px 45px;
  border-radius: 100px;
  border: 0px;
  &:hover{
    transition: all 400ms;
    background: rgba(234,86,0,1);
    border: 2px #231f419c solid;
    bottom: 72px;
  }
`
const Exit = styled.div`
  color: white;
  position: absolute;
  right: 50px;
  top: 10px;
  font-size: 30px;
  font-weight: 500;
  font-family: 'Ubuntu';
  cursor: pointer;
  &:hover{
    opacity: 1;
    transition: filter 200ms, opacity 800ms;
    filter:drop-shadow(0px 2px 8px #bebee4);
  }
`
export default class Video extends Component {
  constructor(props){
    super(props);
    this.state = {
      animation:false,
      videoLoop: false,
      wikiOn: false,
    }
  }

  removeVideo = _.once(() =>{
    d3.select('#video')
      .transition()
      .duration(1500)
      .style('opacity',0)
      .on('end',function(){
        d3.select(this).remove();
      })
    })

  componentDidMount(){
    window.setTimeout(() => this.setState({animation: true}) ,1000);
    window.setInterval(() => this.setState({videoLoop: !this.state.videoLoop}) ,1550);
  }


  render() {
    console.log(this.state.wikiOn);
    return(
    <Wrapper animation={this.state.animation}>
      <Link to='/'>Refugee Flow</Link>
      <Intro wikiOn ={this.state.wikiOn} animation={this.state.animation} onClick={() => this.setState({wikiOn: !this.state.wikiOn})}>Wiki
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M80 280h256v48H80zM80 184h320v48H80zM80 88h352v48H80z"/><g><path d="M80 376h288v48H80z"/></g></svg>
      </Intro>
      <IntroPage wikiOn ={this.state.wikiOn}>
        <Exit onClick={() => this.setState({wikiOn: !this.state.wikiOn})}>x</Exit>
      </IntroPage>
      <div id="video">{/* onClick={()=> this.removeVideo()} */}
      <BoxShadow/>
        <Section animation={this.state.animation} videoLoop={this.state.videoLoop}>
          <video autoPlay loop muted style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}><source src="https://player.vimeo.com/external/278983563.hd.mp4?s=df2675a8395d48ad7b455f155ae148361121b298&profile_id=175" /></video>
          <Quote videoLoop={this.state.videoLoop} animation={this.state.animation}>"At <i>sea</i>, a frightening number of refugees and migrants are dying each year. On <i>land</i>, people fleeing war are finding their way blocked by closed <i>borders</i>. Closing borders does not solve the problem"</Quote>
        </Section>
      </div>
      <Launch animation={this.state.animation} videoLoop={this.state.videoLoop} href="/conflict">Launch Visualization</Launch>
    </Wrapper>
    )
  }
}
