import React from 'react'
import styled from 'styled-components'

const Box = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const StyledBox = styled(Box)`
  background-color: ${props => props.fillColor};
  border: 1px solid black;
  -moz-box-shadow: 5px 5px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 5px 5px rgba(0, 0, 0, 0.25);
  box-shadow: 5px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
  padding: ${props => props.padding};
  width: 100%;
`;

export default StyledBox;
