import React from 'react'
import styled from 'styled-components'

const Box = ({ className, children }) => (
  <div className={className}>
    {children}
  </div>
);

const StyledBox = styled(Box)`
  background-color: ${props => props.fillColor};
  border: ${props => props.input ? '2px solid #CCD6DD' : '2px solid rgba(0,0,0,0.1);'};
  box-shadow: ${props => props.flat ? 'none' : '0px 0px 0px rgba(0, 0, 0, 0.5)'};
  display: inline-block;
  box-sizing: border-box;
  padding: ${props => props.padding};
  width: 100%;
  border-radius: ${props => props.borderRadius}px;
  text-align:center;
  margin-top:10px;
  
  height:${props => props.height}px;
  
  &:placeholder{
    color:#CCD6DD;
  }
  
  &:hover{
        img{
            opacity: 0.5;
        }
        box-shadow: ${props => props.input ? '2px solid black' : 'none' };
    }
  
  img{
    width:150px;
    margin:auto;
  }
  
`;

StyledBox.defaultProps = {
    borderRadius: 10,
    height: 80
};

export default StyledBox;
