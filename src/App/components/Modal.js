import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';
import styled, { keyframes } from 'styled-components';

import ModalCreator from 'react-modal';
import GlobalModal from '../stylesheets/GlobalModal.css'

class Modal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ModalCreator
          isOpen={this.props.showModal}
          onRequestClose={this.props.onCloseRequest}
          className="GlobeModal"
          overlayClassName="Overlay"
        >
          <div>
            <span
              onClick={this.props.onCloseRequest}
              className="CloseButton">
              &times;
            </span>
          </div>
          {this.props.children}
        </ModalCreator>
      </div>
    );

  }
}

export default Modal;
