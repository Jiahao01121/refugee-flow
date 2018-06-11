import React from 'react';
import styled from 'styled-components';
import * as _ from 'underscore';

const Wrapper = styled.div`
  height: ${window.innerHeight - 60 + 'px'};
  position: absolute;
  width: 55%;
  margin: 0;
  right: 0;
  background: #111117f5;
  box-shadow: 5px 0px 78px -6px rgba(0,0,0,0.62);

  @media (max-width: 1100px) {
    width: 45%;
  }

  @media (max-width: 900px) {
    width: 35%;
  }
`

export default class RefugeeRoute_textArea extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return(
      <Wrapper>

      </Wrapper>
    )
  }
}
