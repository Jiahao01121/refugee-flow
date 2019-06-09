import React from 'react';
import styled, { css } from 'styled-components';

const Text = styled.p`
  transition: opacity cubic-bezier(0.13, 0.01, 0.02, 0.92) 1500ms;
  color: white;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 300;
  width: calc(100% - 140px);
  opacity: ${props => (props.animate ? 1 : 0)};
  line-height: 2;

  &>em>a{
    transition: color 800ms;
    font-family: 'Tajawal';
    font-size: 24px;
    font-weight: 100;
    font-style: normal;
    text-decoration: underline;
    color: #9cddf7;
    letter-spacing: 1px;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);

    &:hover{
      color: #f2fbff;
    }
  }

  &>a{
    transition: color 800ms;
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 100;
    font-style: normal;
    text-decoration: underline;
    color: #9cddf7;
    letter-spacing: 1px;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
    &:hover { color: #f2fbff; }
  }

  ${props => props.isClosed && (css`display:  none;`)}
`;


const Paragraph = (props) => <Text {...props} />;

export default Paragraph;
