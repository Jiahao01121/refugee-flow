import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';
import styled, { keyframes } from 'styled-components';

import ModalCreator from 'react-modal';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)'
  }
};

// const show = keyframes`
//   0% {
//     display: none;
//     opacity: 0;
//   }
//   1% {
//     display: flex;
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// `;
//

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
          style={customStyles}
        >
          <div>
            <button onClick={this.props.onCloseRequest} stlye={{float: 'right'}}>X</button>
          </div>
          {this.props.children}
        </ModalCreator>
      </div>
    );

  }
}

export default Modal;
