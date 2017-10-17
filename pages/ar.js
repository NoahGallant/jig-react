import React from 'react'
import 'isomorphic-fetch'

import spotifySearch from '../search'
import config from '../config'

import App from './App'
import StyledBox from '../components/StyledBox'

async function soundcloudSearch (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch('https://api.soundcloud.com/tracks?client_id='+config.soundcloudClientId+'&limit=1&q='+encodeURI(query), search_headers)
    const resultsJson = await results.json();
    return resultsJson;
}

async function appleFind (sid) {
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch('https://itunes.apple.com/lookup?id='+sid, search_headers);
    const resultsJson = await results.json();
    return resultsJson.results
}

async function geniusFind (query){
    const search_headers = {
        method: 'GET',
        Accept: 'application/json',
        Host: 'api.genius.com',
        Authorization: 'Bearer '+config.geniusKey

    };
    const results = await fetch('https://api.genius.com/search?q='+encodeURI(query)+"&access_token="+config.geniusKey, search_headers);
    const resultsJson = await results.json();
    console.log(resultsJson);
    return resultsJson.response.hits;
}

async function youtubeFind (query){
    const search_headers = {
        method: 'GET'
    };
    const results = await fetch('https://www.googleapis.com/youtube/v3/search?videoTypeId=10&part=snippet&q='+encodeURI(query)+'&key='+config.youtubeKey+'&maxResults=1', search_headers)
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
        console.log(appleTrack)
        props['trackName'] = appleTrack.trackCensoredName;
        props['artistName'] = appleTrack.artistName;
        const term = props['artistName'].split('&')[0] + " - " + props['trackName'];
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
            const stats = await fetch("https://www.googleapis.com/youtube/v3/videos?part=statistics&id="+videoId+"&key="+config.youtubeKey);
            const statsJson = await stats.json();
            props['views'] = statsJson.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            props['youtubeLink'] =  'https://youtube.com/watch?v='+videoId;
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
        return (
          <App>
            <div>
                {this.props.trackName} - {this.props.artistName} from {this.props.albumName}
                <br/>
                <img src={this.props.albumImage}/>
                <br/>
                {this.props.popularity}
                <br/>
                {this.props.views}
                <br/>
                {this.props.hot && (<span>Hot</span>)}
                <br/>
                <a href={this.props.appleLink}>
                    {this.props.trackName}
                </a>
                <br/>
                {this.props.spotify && (
                    <a href={this.props.spotifyLink}>
                        {this.props.spotifyTitle}
                    </a>)
                }
                <br/>
                {this.props.soundcloud && (
                  <StyledBox>
                    <a href={this.props.soundcloudLink}>
                        {this.props.soundcloudTitle}
                    </a>
                  </StyledBox>
                )
                }<br/>
                {this.props.youtube && (
                    <a href={this.props.youtubeLink}>
                        {this.props.youtubeTitle}
                    </a>)
                }<br/>
                {this.props.genius && (
                    <a href={this.props.geniusLink}>
                        {this.props.geniusTitle}
                    </a>)
                }
            </div>
          </App>
        )
    }
}

export default Ar
