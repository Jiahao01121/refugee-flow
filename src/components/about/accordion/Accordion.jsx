import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  margin-left: 90px;
  &::after{
    content: '';
    width: calc(100% - 140px);
    height: 2px;
    background: #8dd8d6;
    position: absolute;
    top: 35px;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`;

const Title = styled.p`
  transition: font-size 800ms,margin-left cubic-bezier(0.48, 0.02, 0, 1.02) 1000ms, color 800ms, filter 500ms;
  color: #8BDEFF;
  font-family: 'Tajawal';
  margin-left: ${props => (props.animate ? 0 : `${window.innerWidth}px`)}
  font-size: ${props => (props.animate ? '35px' : '0px')};
  font-weight: 200;
  font-style: normal;
  letter-spacing: 2px;

  &:hover{
    color: #ceeefb;
    cursor: pointer;
    filter: drop-shadow(0px 2px 5px #a2a2c9);
  }
`;

const Toggle = styled.p`
  transition: all 600ms;
  font-family: 'Roboto';
  font-size: 35px;
  font-weight: 100;
  font-style: normal;
  color: white;
  position: absolute;
  top: ${props => (props.last ? '-8px' : '-42px')};
  left: ${() => `${window.innerWidth - 150 - 13}px`};
  cursor: pointer;
  opacity: .8;
  &:hover{
    opacity: 1;
  }
  &::selection {
    text-shadow: none;
    background: none;
    color: none;
  }
`;

const Accordion = ({ isClosed, animate, title, onToggle, children }) => (
  <Wrapper>
    <Title onClick={onToggle} animate={animate}>{title}</Title>
    <Toggle onClick={onToggle}>{isClosed ? '+' : '–'}</Toggle>
    {children}
  </Wrapper>
);

Accordion.defaultProps = {
  children: null,
};

Accordion.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  animate: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Accordion;
