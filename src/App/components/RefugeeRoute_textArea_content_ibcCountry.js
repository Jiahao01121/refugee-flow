import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 80%;
  left: 20%;
  position: relative;
  background: #161423;
  height: ${() => window.innerHeight -60 - 90 + 'px'};
  top: 90px;
`
const PlaceHolder = styled.p`
  font-family: 'Roboto';
  font-size: 60px;
  padding-right: 10px;
  font-style: normal;
  font-weight: 500;
  color: #ffffff0f;
  transition: all 800ms;
  cursor: pointer;
  &:hover{
    color: #ffffff82;
  }
`

export default class RefugeeRoute_textArea_content_ibcCountry extends React.Component {

  constructor(props){
    super(props);

  }

  // componentWillReceiveProps(nextProps){
  // }

  render(){
    return(
      <Wrapper>
        <PlaceHolder>section currently under construction...</PlaceHolder>
      </Wrapper>
    )
  }
}
