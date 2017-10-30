import Layout from '../components/Layout'
import React, { Component } from 'react'
import { Box, Flex } from 'rebass'
import 'isomorphic-fetch'
import {Container} from 'rebass'
import styled from 'styled-components'
import StyledBox from '../components/StyledBox'
import StyledA from '../components/StyledA'
import Footer from '../components/Footer'

const Search = styled.input`
  border: 0;
  font-family: inherit;
  font-size: 1.25rem;
  background-color:none;
  box-sizing: border-box;
  padding:10px;
  padding-left:20px;
  box-sizing:border-box;
  border-radius:10px;
  height:100%;
  width: 100%;
  font-family: "Rubik", "Helvetica", sans-serif;
  
  &:focus {
    outline: none;
  }
`;

const StyledListItem = styled.li`
  margin: 2em 0;
`;

const Placeholder = styled.div`

  margin-top:80px;
  margin-bottom:30px;
  margin-left:-10px;
  img{
    opacity:0.9;
  }

`

const StyledList = styled.ul`
  list-style-type: none;
`;

const DisplayList = styled(SongList)`
  width: 100%;
  
  img {
    width: 100%;
  }
`;


function SongList(props) {
    const colors = [
        '#FFDEDE','#FFEBDB','#FFFCDE','#E7FFE2','#ECFFFF','#F3F2FF','#F7EEFF','#FFE8FC'
    ];

    if (props.songs == null || props.songs.length == 0) {
        return (
            <Placeholder>
                <img src='/static/alt.svg'/>
            </Placeholder>
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
        <title>
            Jig — Music Sharing
        </title>
          <Flex wrap mx={-2}>
          <Box width={1} mt={5} mb={2}>
            <StyledBox borderRadius={10} height={60} input>
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
          <Footer/>
      </Layout>
    )
  }
}

export default Index
