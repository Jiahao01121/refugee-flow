import React, { Component } from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${window.innerHeight - 60 + 'px'};
`
const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
`
const Img = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  opacity: 0.3;
  filter: brightness(0.3);
  z-index: -1;
`

const Quote = styled.p`
  position: absolute;
  font-family: 'Roboto';
  font-weight: 100;
  font-size: 40px;
  line-height: 1.4;
  color: #fff;
  text-align: center;
  width: 65%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-70%);
  z-index: 1;

  &>strong{
    color: #41EDB8;
    font-weight: 400;
  }
`

const QuoteBy = styled.span`
  font-family: 'Miller-DisplaySC';
  font-size: 16px;
  line-height: 50px;
  display: flex;
  justify-content: flex-end;
  top: 30px;
  position: relative;
`

const SideLinks = styled.ul`
  display: flex;
  justify-content: space-around ;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100vh;
  bottom: 0;
  right: 4.5em;
  line-height: 2em;
  transform: rotate(90deg);
  transform-origin: 100% 100%;
`

const List = styled.li`
  display: inline-block;
  margin: 0 1em;
  list-style: none;
`

const Link = styled.a`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  text-decoration: none;
  color: white;
  z-index: 1;
`

const LaunchViz = styled.a`
  width: 190px;
  padding: 20px 20px;
  position: absolute;
  top: ${window.innerHeight -60-80 - 30 + 'px'};
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: 'Roboto';
  font-size: 15px;
  color: white;
  text-decoration: none;
  border-radius: 2px;
  border: 2px solid white;
  transition: all 400ms;
  z-index: 1;

  &:hover{
    cursor: pointer;
    background: #0C0C14;
    border-color: #352554;
  }
`

export default class Landing extends Component {
  render() {
    return(
      <Wrapper>
        <Quote>"The world is in much <strong>greater disarray</strong> than it was during the Cold War, in the Cold War, the world had two fundamental concentrations of power in the United States and the Soviet Union, and both respective alliance-systems. We understood how to <strong>avoid direct confrontation</strong>, because anything might lead to nuclear escalation, and we have formal or informal roles. <strong> Well, now is anything but</strong>. We have power much more widely distibuted in the world, plus we have globalization." <QuoteBy> - richard haass, vice interview, oct 2017</QuoteBy>
        </Quote>
        <div>
          <SideLinks>
            <List><Link href="https://www.behance.net/will-su" target="_blank">Behance</Link></List>
            <List><Link href="https://github.com/Jiahao01121/refugee-flow" target="_blank">Github</Link></List>
          </SideLinks>
        </div>
        <Video autoPlay loop muted plays-inline>
          <source src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761" type="video/mp4" />
        </Video>
        <Img src="https://www.activistpost.com/wp-content/uploads/2015/09/turkish-soldiers-stand-guard-syrian-refugees-wait-behind-border-fences.jpg"></Img>

        <LaunchViz href='/conflict'>Launch Visualization</LaunchViz>
      </Wrapper>
    )
  }
}
