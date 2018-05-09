import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: ${window.innerHeight - 60 + 'px'};

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

const UnderDev = styled.p`
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
  transform: translate(-50%,-100%);
  z-index: 1;

  &>strong{
    color: #41EDB8;
    font-weight: 400;
  }
`


export default class RefugeeRoute extends Component {
  render() {
    return(
      <Wrapper>
        <UnderDev>Currently Under Construction<br/> Stay Tuned...</UnderDev>
        <Img src="https://static01.nyt.com/images/2016/04/18/blogs/02australialetter32-18-lens-refugees-slide-8AS8-copy/18-lens-refugees-slide-8AS8-superJumbo.jpg?quality=90&auto=webp"></Img>
      </Wrapper>
    )
  }
}
