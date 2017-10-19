import React from 'react'
import 'isomorphic-fetch'

import spotifySearch from '../search'
import config from '../config'

import Layout from '../components/Layout'
import { Box, Flex } from 'rebass'
import styled from 'styled-components'
import StyledBox from '../components/StyledBox'


const FloatFrame = styled.iframe`
  position:fixed;
  width:100%;
  bottom: 0;
  left:0;
  height:110px;
  border:1px solid black;
`;

const GridBox = styled(Box)`
  box-sizing: border-box;
`;

const colors = {
  appleMusicPink: '#FFE1EA',
  geniusYellow: '#FFF1C7',
  soundcloudOrange: '#FFF0E3',
  spotifyGreen: '#D9FFE9',
  youtubeRed: '#FFE1E1'
};

async function soundcloudSearch (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch(`https://api.soundcloud.com/tracks?client_id=${config.soundcloudClientId}&limit=1&q=${encodeURI(query)}`, search_headers)
    const resultsJson = await results.json();
    return resultsJson;
}

async function appleFind (sid) {
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch(`https://itunes.apple.com/lookup?id=${sid}`, search_headers);
    const resultsJson = await results.json();
    return resultsJson.results
}

async function geniusFind (query){
    const search_headers = {
        method: 'GET',
        Accept: 'application/json',
        Host: 'api.genius.com',
        Authorization: `Bearer ${config.geniusKey}`
    };
    const results = await fetch(`https://api.genius.com/search?q=${encodeURI(query)}&access_token=${config.geniusKey}`, search_headers);
    const resultsJson = await results.json();
    console.log(resultsJson);
    return resultsJson.response.hits;
}

async function youtubeFind (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch(`https://www.googleapis.com/youtube/v3/search?videoTypeId=10&part=snippet&q=${encodeURI(query)}&key=${config.youtubeKey}&maxResults=1`, search_headers)
    const resultsJson = await results.json();
    return resultsJson.items
}

class Ar extends React.Component {
    static async getInitialProps (ctx) {
      const { req, res, query } = ctx;
        if (!query.e){
            res.writeHead(301, {
                Location: '/'
            });
            res.end();
            res.finished = true;
            return {};
        }
        let props = {};

        const sid = query.e;
        const appleResults = await appleFind(sid);
        const appleTrack = appleResults[0];
        props['trackName'] = appleTrack.trackCensoredName;
        props['appleId'] = sid;
        props['artistName'] = appleTrack.artistName;
        const term = `${props['artistName'].split('&')[0]} - ${props['trackName']}`;
        props['appleLink'] = appleTrack.trackViewUrl;
        props['albumImage'] = appleTrack.artworkUrl100.replace('100x100bb','300x300bb');
        props['albumName'] = appleTrack.collectionName

        try {
            const spotifyResults = await spotifySearch(term);
            props['spotifyTitle'] = spotifyResults[0].name;
            props['spotifyLink'] = spotifyResults[0].external_urls.spotify;
            props['popularity'] = spotifyResults[0].popularity;
            props['spotify'] = true;
        }
        catch (e){
            console.log('Spotify not found');
        }

        try {
            const soundcloudResults = await soundcloudSearch(term);
            props['soundcloudTitle'] = soundcloudResults[0].title;
            props['soundcloudLink'] = soundcloudResults[0].permalink_url;
            props['soundcloud'] = true;
        }
        catch (e){
            console.log('Soundcloud not found');
        }

        try {
            const youtubeResults = await youtubeFind(term);
            props['youtubeTitle'] = youtubeResults[0].snippet.title;
            const videoId = youtubeResults[0].id.videoId;
            const stats = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${config.youtubeKey}`);
            const statsJson = await stats.json();
            props['views'] = statsJson.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            props['youtubeLink'] = `https://youtube.com/watch?v=${videoId}`;
            props['youtube'] = true;

        }
        catch (e){
            console.log('Youtube not found');
        }

        try {
            const geniusResults = await geniusFind(term.replace(/ *\([^)]*\) */g, ""));
            props['genius'] = true;
            props['geniusTitle'] = geniusResults[0].result.title;
            props['hot'] = geniusResults[0].result.stats.hot;
            props['geniusLink'] =  geniusResults[0].result.url;

        }
        catch (e){
            console.log('Genius not found')
        }

        return props
    }


    constructor(props) {
        super(props)
    }

    render(){
      const pageTitle = `Jig — ${this.props.trackName}`;
        return (
          <Layout>
            <FloatFrame
              src={`//tools.applemusic.com/embed/v1/song/${this.props.appleId}?country=us`}
              width="100%" frameborder="0"></FloatFrame>
            <Flex justify='center' mx={-2} wrap>
              <style jsx>{`
                .grey {
                  color: rgba(0, 0, 0, 0.25);
                }
              `}</style>
              <GridBox width={[1,1/2]} px={2}>
                <img width="100%" src={this.props.albumImage}/>
              </GridBox>
              <GridBox width={1/2} px={2}>
                <h1>{this.props.trackName}</h1>
                <h2>
                  <span className="grey"> by </span>
                  {this.props.artistName}
                  <span className="grey"> from </span>
                  <em>{this.props.albumName}</em>
                </h2>
                <h3>{this.props.popularity}</h3>
                <h3>{this.props.views}</h3>
                <h3>{this.props.hot && (<span>Hot</span>)}</h3>
              </GridBox>
              <GridBox width={[1,1/3]} px={2}>
                <a href={this.props.appleLink}>
                  <StyledBox fillColor={colors.appleMusicPink} padding="1rem">
                    {this.props.trackName}
                  </StyledBox>
                </a>
              </GridBox>
              {this.props.spotify &&
                <GridBox width={[1,1/3]} px={2}>
                  <a href={this.props.spotifyLink}>
                    <StyledBox fillColor={colors.spotifyGreen} padding="1rem">
                      {this.props.spotifyTitle}
                    </StyledBox>
                  </a>
                </GridBox>
              }
              {this.props.genius &&
                <GridBox width={[1,1/3]} px={2}>
                  <a href={this.props.geniusLink}>
                    <StyledBox fillColor={colors.geniusYellow} padding="1rem">
                      {this.props.geniusTitle}
                    </StyledBox>
                  </a>
                </GridBox>
              }
              <GridBox width={1} px={2}>
                <h2>Similar Versions</h2>
              </GridBox>
              {this.props.soundcloud &&
                <GridBox width={[1,1/2]} px={2}>
                  <StyledBox fillColor={colors.soundcloudOrange} padding="1rem">
                    <a href={this.props.soundcloudLink}>
                      {this.props.soundcloudTitle}
                    </a>
                  </StyledBox>
                </GridBox>
              }
              {this.props.youtube &&
                <GridBox width={[1,1/2]} px={2}>
                  <StyledBox fillColor={colors.youtubeRed} padding="1rem">
                    <a href={this.props.youtubeLink}>
                      {this.props.youtubeTitle}
                    </a>
                  </StyledBox>
                </GridBox>
              }
            </Flex>
          </Layout>
        )
    }
}

export default Ar
