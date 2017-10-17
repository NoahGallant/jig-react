import Layout from '../components/Layout'
import React, { Component } from 'react'
import 'isomorphic-fetch'
import {Provider} from 'rebass'
import 'styled-components'

function SongList(props) {
    if (!props.songs) {
        return null;
    }
    const songs = props.songs.map((song)=>
        <li key={song.trackId}>
            <a href={"/ar?e="+song.trackId}>{song.trackCensoredName} - {song.artistName}</a>
        </li>
    );
    return (
        <ul>{songs}</ul>
    )
}

async function appleSearch (query) {
    const search_headers = {
        method: 'GET'
    };
    return fetch('https://itunes.apple.com/search?term='+encodeURI(query)+'&limit=10&media=music&entity=song', search_headers)
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
                <input className="input is-large is-fullwidthn" type="text" value={this.state.query} onChange={this.handleChange} />
                <SongList songs={this.state.results} />
          </Layout>

        )
    }
}

export default Index
