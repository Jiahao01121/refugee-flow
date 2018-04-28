import React, { Component } from 'react';
import styled from 'styled-components';

const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
`

class Region extends Component {
  render() {
    return (
      <RegionContainer>
        <div>

        </div>
      </RegionContainer>
    )
  }
}

export default Region;
