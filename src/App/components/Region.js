import React, { Component } from 'react';
import styled from 'styled-components';

const RegionContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #15151cd1;
  box-shadow: 0px 16px 20px 11px rgba(6, 6, 14, 0.38);
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
