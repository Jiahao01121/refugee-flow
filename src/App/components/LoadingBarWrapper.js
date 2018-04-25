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

  ${props => props.marginTop && css`
    margin-top: ${props.marginTop + 'px'};
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
  text-align: center;
  margin-top: 25px;
`

export {
  LoadingDivWrapper,
  LoaderGraphWrapper,
  LoadingIndicator,
}
