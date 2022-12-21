import React, { useState, useEffect } from 'react';

const Track = ({ trackId, clientId, clientSecret }) => {
  const [track, setTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set up authorization headers
        const headers = new Headers({
          Authorization: `Basic ${btoa(`${process.env.REACT_APP_SPOTIFY_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`)}`,
        });

        // Make the API request
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          headers,
        });
        const data = await response.json();

        // Update the state with the track data
        setTrack(data);
      } catch (e) {
        // Update the state with the error
        setError(e);
      }
    };

    fetchData();
  }, [trackId, clientId, clientSecret]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{track.name}</h2>
      <p>{track.artists.map(artist => artist.name).join(', ')}</p>
      <img src={track.album.images[0].url} alt={`Cover for ${track.name}`} />
      <a href={track.external_urls.spotify}>View on Spotify</a>
    </div>
  );
};

export default Track;
