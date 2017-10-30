import styled from 'styled-components'

const Badge = styled.span`
    background-color: ${props => props.color};
    display:inline;
    border-radius:10px;
    font-size:18px;
    padding:9px;
    padding-top:3px;
    padding-bottom:3px;
    line-height:2;
    font-family: ${props => props.font};
    font-size: ${props => props.size}px;
`;

Badge.defaultProps = {
    size: 18,
    font: 'inherit'
};

export default Badge