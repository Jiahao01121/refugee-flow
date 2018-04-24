import styled, { css } from 'styled-components';

const LoadingDivWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => props.leftPercentage};
  display: block;
  transform: translate(-50%,-50%);
  z-index: 1;
  ${props => !props.loading && css`
    display: none;
  `}
`

const LoaderGraphWrapper = styled.div`
  position: absolute;
  left:50%;
  transform: translate(-50%,-50%);
`
const LoadingIndicator = styled.p`
  font-family: 'Roboto';
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  margin-top: 25px;
  text-align: center;
`

export {LoadingDivWrapper,
LoaderGraphWrapper,
LoadingIndicator,} ;
