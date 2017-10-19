import styled from 'styled-components'

const SelectText = styled.textarea.attrs({
  readOnly: true,
  rows: '1'
})`
  background-color: transparent;
  border: none;
  display: block;
  font-family: inherit;
  font-size: 1.5rem;
  line-height: 1;
  margin: 0;
  outline: 0;
  padding: 1rem;
  resize: none;
  width: 100%;
`;

export default SelectText
