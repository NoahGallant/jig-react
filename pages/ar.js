import React from 'react'
import 'isomorphic-fetch'

import spotifySearch from '../search'

import Layout from '../components/Layout'
import { Box, Flex } from 'rebass'
import SelectText from '../components/SelectText'
import styled from 'styled-components'
import StyledBox from '../components/StyledBox'
import StyledA from '../components/StyledA'
import Footer from '../components/Footer'
import Badge from '../components/Badge'


function Popularity(props) {
    if (!props.num){
        return null;
    }
    let faces = [];
    for (let i = 0; i < 5; i++){
        let op = 0.3;
        if (i <= props.num){
            op = 1
        }
        faces.push(<Face src='static/face.svg' opaque={op}/>)
    }
    return (<Badge color='#FFE6D6'>{faces}</Badge>);
}

const FloatFrame = styled.iframe`
  position:fixed;
  width:100%;
  bottom: 0;
  clear:both;
  left:0;
  height:110px;
  border:none;
  border-top:5px solid #CCD6DD;
  z-index:3;
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

const Face = styled.img`
    opacity: ${props => props.opaque};
    height:20px;
    vertical-align:middle;
    margin-right:3px;
    margin-left:3px;
    margin-bottom:2px;
`;

const SongTitle = styled.h1`
    display:inline;
    font-size:24px;
    line-height:24px;
    font-weight:900;
`;

const SongInfo = styled.h3`
    display:inline;
    font-size:18px;
    font-weight:500;
    line-height:0.9;
    span {
        color:#999;
    }
`;




const Album = styled.img`
    width:100%;
    vertical-align:middle;
    border: 2px solid black;
    border-radius:10px;
`;


const Subtitle = styled.div`
    margin-top:30px;
    margin-bottom:10px;
    text-align:center;
    font-weight:300;
    
    span{
        color:#777;
    }
`;

const Space = styled.div`
    content: ' ';
    height:120px;
`;

const Lyrics = styled.a`
    background-color:#fff4a5;
    color:black;
    border-radius:10px;
    text-decoration:none;
    font-weight:700;
    font-size:12px;
    margin-left:5px;
    vertical-align:top;
    padding:8px;
    padding-top:2px;
    padding-bottom:2px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    line-height:2;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
    
    &:hover{
        box-shadow:none;
        color:rgba(0,0,0,0.5);
    }
`;

const SimilarBox = styled(StyledBox)`
    img{
        height:35px;
        margin-bottom:5px;
    }
    div{
        font-size:16px;
    }

`;

async function soundcloudSearch (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch(`https://api.soundcloud.com/tracks?client_id=${process.env.soundcloudClientId}&limit=1&q=${encodeURI(query)}`, search_headers)
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
        Authorization: `Bearer ${process.env.geniusKey}`
    };
    const results = await fetch(`https://api.genius.com/search?q=${encodeURI(query)}&access_token=${process.env.geniusKey}`, search_headers);
    const resultsJson = await results.json();
    console.log(resultsJson);
    return resultsJson.response.hits;
}

async function youtubeFind (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch(`https://www.googleapis.com/youtube/v3/search?videoTypeId=10&part=snippet&q=${encodeURI(query)}&key=${process.env.youtubeKey}&maxResults=1`, search_headers)
    const resultsJson = await results.json();
    return resultsJson.items
}

class Ar extends React.Component {
    static async getInitialProps ({ req, res, query }) {
        if (!req){
            return {reload:true}
        }
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
            props['popularity'] = Math.floor(spotifyResults[0].popularity / 20);
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
            const stats = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${process.env.youtubeKey}`);
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

    selectText(event) {
      event.target.focus();
      event.target.select();
    }

    constructor(props) {
        super(props)
    }

    render(){
        if(this.props.reload){
            return(<div>
                    Loading...
                    <script type='text/javascript'>document.onload() = function(){window.location.assign(window.location.href)}</script>
                    </div>)
        }
      const pageTitle = `Jig — ${this.props.trackName} - ${this.props.artistName}`;
        return (
          <Layout>
            <title>{ pageTitle }</title>
            <FloatFrame
              src={`//tools.applemusic.com/embed/v1/song/${this.props.appleId}?country=us`}
              width="100%" frameborder="0"/>
            <Flex mx={-2} wrap>
              <GridBox width={[1,1/2]} px={2}>
                <Album src={this.props.albumImage}/>
              </GridBox>

              <GridBox width={[1,1/2]} px={2} mt={'10px'}>
                <SongTitle>{this.props.trackName}</SongTitle>
                  {this.props.genius &&
                  <Lyrics href={this.props.geniusLink}>
                      LYRICS
                  </Lyrics>
                  }
                  <br/>
                <SongInfo>
                  <span> by </span>
                  {this.props.artistName}
                  <br/>
                  <span> from </span>
                  <em>{this.props.albumName}</em>
                </SongInfo>
                  <br/><br/>
                  <Popularity num={this.props.popularity}/>
                  <br/>
                  {this.props.youtube &&
                    <Badge color='#F1CBFF' size={16}>{this.props.views} views</Badge>
                  }
              </GridBox>
              <GridBox width={1} mt={'25px'} mb={'15px'} px={2}>
                <StyledBox fillColor="#EEE" height={48} borderRadius={10} style='margin-bottom:0px' flat>
                  <SelectText onClick={this.selectText}>
                      https://jig.sh/ar?e={this.props.appleId}
                  </SelectText>
                </StyledBox>
              </GridBox>
              <GridBox width={[1,1/2]} px={2}>
                <a href={this.props.appleLink}>
                  <StyledBox fillColor={colors.appleMusicPink} padding="1rem">
                    <img src="static/apple.svg"/>
                  </StyledBox>
                </a>
              </GridBox>
              {this.props.spotify &&
                <GridBox width={[1,1/2]} px={2}>
                  <a href={this.props.spotifyLink}>
                    <StyledBox fillColor={colors.spotifyGreen} padding="1rem">
                        <img src="static/spotify.svg"/>
                    </StyledBox>
                  </a>
                </GridBox>
              }
              <GridBox width={1} px={2}>
                  <Subtitle><Badge color="#EEE">Similar Versions</Badge></Subtitle>
              </GridBox>
              {this.props.soundcloud &&
                <GridBox width={[1,1/2]} px={2}>
                    <StyledA href={this.props.soundcloudLink}>
                        <SimilarBox fillColor={colors.soundcloudOrange} height={'auto'} padding="1rem">
                            <img src='static/soundcloud.svg'/>
                            <div>
                                {this.props.soundcloudTitle}
                            </div>
                        </SimilarBox>
                    </StyledA>
                </GridBox>
              }
              {this.props.youtube &&
                <GridBox width={[1,1/2]} px={2}>
                    <StyledA href={this.props.youtubeLink}>
                  <SimilarBox fillColor={colors.youtubeRed} height={'auto'} padding="1rem">
                      <img src='static/youtube.svg'/>
                      <div>
                            {this.props.youtubeTitle}
                      </div>
                  </SimilarBox>
                    </StyledA>
                </GridBox>
              }
            </Flex>
              <Footer/>
              <Space/>
          </Layout>
        )
    }
}

export default Ar
