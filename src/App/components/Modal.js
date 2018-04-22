import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';
import styled, { keyframes } from 'styled-components';

const show = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  background-color: rgba(0,0,0,0.7);
  z-index: 9999;
  opacity: 1;
  overflowX: hidden;
  overflowY: auto;
  animation: ${show} .5s ease;
`;

const ModalItem = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0, 0, 0.625rem, rgba(0,0,0, 0,2);

  @media (min-width: 576px) {
    width: 32rem;
  }
`;

const CloseButton = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: #fff;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  cursor: pointer;
  outline: 0;
  box-shadow: 0,0,0.625rem, rgba(0,0,0,0.2);

  &:before{
    transform: rotate(45deg);
  }
  &:after{
    transform: rotate(-45deg);
  }
  &:hover:before, &:hover:after {
    background-color: #444;
  }
`;

class Modal extends Component {

  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp(e) {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
        e.preventDefault();
        onCloseRequest();
        window.removeEventListener('keyup', this.handleKeyUp, false);
      },
    };

    if (keys[e.keyCode]) { keys[e.keyCode](); }
  }

  handleOutsideClick(e) {
    const { onCloseRequest } = this.props;

    if (!isNil(this.modal)) {
      if (!this.modal.contains(e.target)) {
        onCloseRequest();
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  }
  render() {
    const {
      onCloseRequest,
      children,
    } = this.props;

    return (
      <ModalOverlay>
        <ModalItem>
          <div>
            {children}
          </div>
          />
        </ModalItem>

        <CloseButton
          type="button"
          onClick={onCloseRequest}
        >
        </CloseButton>
      </ModalOverlay>
    );
  }
}

export default Modal;
