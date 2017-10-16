import config from './config'

async function spotifySearch (query){
    const token_headers = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + config.spotifyEncoded,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "grant_type=client_credentials"

    };

    const response = await fetch('https://accounts.spotify.com/api/token', token_headers);
    const token = await response.json();


    const search_headers = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+token.access_token,
            'Accept': 'application/x-www-form-urlencoded'
        }

    };
    query = query.replace(/ *\([^)]*\) */g, "");
    const results = await fetch('https://api.spotify.com/v1/search?type=track&limit=10&q='+encodeURI(query), search_headers);
    const resultsJson = await results.json();
    return resultsJson.tracks.items;
}

export default spotifySearch