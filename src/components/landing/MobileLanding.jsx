import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const NavbarContainer = styled.div`
  height: 40px;
  background: #2d2d4a;
  position: relative;
  box-shadow: inset 0px 11px 40px -11px rgba(0, 0, 0, 0.97);
  z-index: 2;
  transition: all 2000ms;

  &::before{
    content: '';
    width: ${props => props.loadBar ? '100%':'0%'};
    height: 4px;
    background: #00ffb0bd;
    position: absolute;
    top: 0;
    transition: inherit;
  }

  > a:first-child{
    font-family: 'Ubuntu',sans-serif;
    font-weight: 900;
    font-size: 12px;
    color: white;
    text-decoration: none;
    padding-left: 15px;
    position: relative;
    transition: all 200ms;
    top: 9px;
    &:hover{
      filter: drop-shadow(0px 2px 5px #a2a2c9);

    }
  }

  > a:first-child:after{
    content: 'A Comparitive Study on Conflicts and Refugee Movement';
    font-family: 'Ubuntu';
    font-weight: 100;
    color: white;
    opacity: 0.4;
    transition: 400ms all;
    font-size: 9px;
    position: relative;
    left: 10px;
    bottom: 1px;
    width: 300px;
    word-spacing: 3px;
    filter: drop-shadow(0px 0px 0px #000) !important;
  }
`
const Wrapper  = styled.div`
  & ::selection {
    text-shadow: 0 0 0.8rem #de2279;
    background: rgba(54, 56, 126, 0.1);
    color: #b6b6cc;
    }
  overflow-x:hidden;
  overflow-y:hidden;
  position: fixed;
  width: 100vw;
  height: 100vh;
`
const Video = styled.video.attrs({
  opacity: props => props.animation?1:0,
  filter: props => props.videoLoop ? 'blur('+ Math.abs(d3.randomNormal(0,10)()) +'px'+') hue-rotate(0deg) contrast(1.2) saturate(0.8) brightness(0.5);': 'blur(' + Math.abs(d3.randomNormal(0,10)()) + 'px'+ ') hue-rotate(0deg) contrast(1.2) saturate('+d3.randomUniform(1, 2.5)()+') brightness('+d3.randomUniform(0.4, 1.2)()+');'
})`
    height: 130vh;
    position: absolute;
    top: -15vh;
    left: -420%;
    z-index: -1;
    background-size: cover;
    transition: opacity 5500ms, filter 1550ms;
    opacity: ${props => props.opacity};
    filter: ${props => props.filter};

    @media (max-width:1590px) and (min-width: 1270px) {
      width: 900%;
    };

    @media (  max-width: 1269px) {
      width: 910%;
    };

    @media (min-width:1590px){
      width: 125%;
    };

    @media (max-width:890px){
      width: 790%;
    };

    @media (max-width:650px){
      width: 800%;
    };
`
const Text = styled.p`
  position: absolute;
  font-family: 'Playfair Display',serif;
  width: 70%;
  text-align: center;
  top: ${props => props.animation?'40%':'37%'};
  opacity: ${props => props.animation?1:0};
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 2;
  color: #ffffff;
  transition: top 2100ms,opacity 300ms;
  z-index: 2;
`
const LearnMore = styled.p`
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
font-size: 10px;
color: white;
background:rgba(234,86,0,.80);
padding: 10px 20px;
border-radius: 100px;
border: 0px;
&:hover{
  transition: all 400ms;
  background: rgba(234,86,0,1);
  border: 2px #231f419c solid;
  bottom: 72px;
}
`

class MobileLanding extends React.Component {

    state = {
      animation:false,
      videoLoop: false,
      wikiOn: false,
      hovered: false,
    }

  componentDidMount(){
    d3.select('#nav-show').style('display','none');
    window.setTimeout(() => this.setState({animation: true}) ,1000);
    window.setInterval(() => this.setState({videoLoop: !this.state.videoLoop}),1650);
  }

  render(){
    return (

      <Wrapper>
        <NavbarContainer hovered={this.state.hovered} >
          <a href='/' onMouseOver={() => this.setState({hovered: true})} onMouseOut={() => this.setState({hovered: false})}>Refugee Flow</a>
        </NavbarContainer>
        <Video animation={this.state.animation} videoLoop={this.state.videoLoop} autoPlay muted loop style={{backgroundVideo: 'url(assets/img/hero.jpg)'}}><source src="https://player.vimeo.com/external/278983563.hd.mp4?s=df2675a8395d48ad7b455f155ae148361121b298&profile_id=175" /></Video>
        <Text animation={this.state.animation}>Thanks for your interest in learning more about the refugee crisis. We designed Refugee Flow as an exploratory experience.<br/><br/> Unfortunately mobile is not best suited for what we built. Instead, please bookmark the page and comeback and explore when you are on a laptop or desktop. </Text>
        <LearnMore animation={this.state.animation} onClick={() => window.open('https://drive.google.com/drive/folders/1hR2JjaMN8DzXA8VyixHJ5zAiolnpoTSF?usp=sharing')}>Learn More...</LearnMore>
      </Wrapper>
    );
  }
}

export default MobileLanding;
