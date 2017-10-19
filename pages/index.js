import Layout from '../components/Layout'
import React, { Component } from 'react'
import { Box, Flex } from 'rebass'
import 'isomorphic-fetch'
import {Container} from 'rebass'
import styled from 'styled-components'
import StyledBox from '../components/StyledBox'

const Search = styled.input`
  border: 0;
  font-family: inherit;
  font-size: 1.25rem;
  padding: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
  }
`;

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

const StyledListItem = styled.li`
  margin: 2em 0;
`;

const StyledList = styled.ul`
  list-style-type: none;
`;

function SongList(props) {
    const colors = [
        '#FFA7A7','#FFCDA7','#FFF7A9','#C2FFB6','#A8FFFF','#A6CCFF','#DDB8FF','#FFC2F7'
    ];

    if (props.songs == null || props.songs.length == 0) {
        return (
            <div>
                <img src='/static/alt.svg'/>
            </div>
        )
    }

    const songs = props.songs.map((song)=>
        <StyledListItem key={song.trackId}>
            <StyledA
              color={colors[Math.floor(Math.random() * colors.length)]}
              href={`/ar?e=${song.trackId}`}
            >
              {song.trackCensoredName} - {song.artistName}
            </StyledA>
        </StyledListItem>
    );
    return (
        <StyledList>{songs}</StyledList>
    )
}

const DisplayList = styled(SongList)`
  width: 100%;
  
  img {
    width: 100%;
  }
`;

async function appleSearch (query) {
    const search_headers = {
        method: 'GET'
    };
    return fetch(`https://itunes.apple.com/search?term=${encodeURI(query)}&limit=10&media=music&entity=song`, search_headers)
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {query: '', results: null};

    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event){
    const query = event.target.value;
    this.setState({query: query});
    if (query === '') {
      this.setState({results: []});
    }

    const s = await appleSearch(query);
    const sC = await s.json();
    this.setState({results: sC.results})
  }

  render(){
    return (
      <Layout>
        <Flex wrap mx={-2}>
          <Box width={1} mt={5} mb={2}>
            <StyledBox>
              <Search
                onChange={this.handleChange}
                placeholder="search for a song..."
                value={this.state.query}
              />
            </StyledBox>
          </Box>
          <Box width={1} my={2}>
            <DisplayList songs={this.state.results} />
          </Box>
        </Flex>
      </Layout>
    )
  }
}

export default Index
