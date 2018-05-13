import styled, { css } from 'styled-components';

const LoadingDivWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: ${props => props.leftPercentage};
  display: block;
  transform: translate(-50%,-50%);
  z-index: 10000000;
  ${props => !props.loading && css`
    display: none;
  `}

  ${props => props.marginTop && css`
    margin-top: ${props.marginTop + 'px'};
  `}
`

const LoaderGraphWrapper = styled.div`
  z-index: 10000000;
  position: absolute;
  left:50%;
  transform: translate(-50%,-50%);
`
const LoadingIndicator = styled.p`
  z-index: 10000000;
  font-family: 'Roboto';
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-top: 25px;
`

export {
  LoadingDivWrapper,
  LoaderGraphWrapper,
  LoadingIndicator,
}
