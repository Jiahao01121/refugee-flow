import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  ${'' /* background: blue; */}
  height: ${() => window.innerHeight -60 - 90 + 'px'};
  top: 90px;
`

export default class RefugeeRoute_textArea_content_basicInfo extends React.Component {

  constructor(props){
    super(props);

  }

  // componentWillReceiveProps(nextProps){
  // }

  render(){
    return(
      <Wrapper>

      </Wrapper>
    )
  }
}
