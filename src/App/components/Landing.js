import React, { Component } from 'react'
import styled from 'styled-components';

const Video = styled.video`
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
`

const Quote = styled.h1`
  position: absolute;
  font-family: 'Roboto', sans-serif;
  top: 30%;
  left: 25%;
  width: 50%;
  font-size: 20px;
  letter-spacing: 3px;
  color: #fff;
  font-family: Oswald, sans-serif;
  text-align: center;
  z-index: -99;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const QuoteBy = styled.span`
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0;
  font-weight: 300;
  font-size: 16px;
  line-height: 50px;
  display: flex;
  justify-content: flex-end;
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
  right: 2.5em;
  line-height: 2em;
  transform: rotate(90deg);
  transform-origin: 100% 100%;
  z-index: -99;
`

const List = styled.li`
  display: inline-block;
  margin: 0 1em;
  list-style: none;
`

const Link = styled.a`
  text-decoration: none;
  color: white;
`

export default class Landing extends Component {
  render() {
    return(
      <div>
        <Quote>"The world is in much greater disarray than it was during the Cold War, in the Cold War,
          the world had two fundamental concentrations of power in the United States and the Soviet Union,
          and both respective alliance-systems. We understood how to avoid direct confrontation,
          because anything might lead to nuclear escalation, and we have formal or informal roles. Well,
          now is anything but. We have power much more widely distibuted in the world, plus we have globalization."
          <QuoteBy> -- Richard Haass, Vice Interview, Oct 2017</QuoteBy>
        </Quote>
        <div>
          <SideLinks>
            <List><Link href="https://www.behance.com" target="_blank">Behance</Link></List>
            <List><Link href="https://www.behance.com" target="_blank">Behance</Link></List>
            <List><Link href="https://www.github.com" target="_blank">Github</Link></List>
          </SideLinks>
        </div>
        <Video autoPlay loop muted plays-inline>
          <source src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761" type="video/mp4" />
        </Video>
      </div>
    )
  }
}
