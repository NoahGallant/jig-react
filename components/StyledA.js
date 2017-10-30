import styled from 'styled-components'

const StyledA = styled.a`
  background-color: ${props => props.color};
  color: black;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-decoration: underline;

  &:hover {
    text-decoration:none;
  }
`;

export default StyledA;