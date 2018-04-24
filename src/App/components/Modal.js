import React, { Component } from 'react';
import isNil from 'lodash/fp/isNil';
import styled, { keyframes } from 'styled-components';
// import DocumentService from '../services/DocumentService';
// import styles from '../stylesheets/ModelContent.css';
import ModalCreator from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
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
          contentLabel="Example Modal"
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
