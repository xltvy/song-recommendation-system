import React, { useEffect } from 'react';
import axios from 'axios';
const SpotifyApi = () => {
  useEffect(() => {
    const fetchData = async () => {
      // Set up authorization headers
      const trackId = '2Am26UXisQ91vBLYdqd7Pa';
      const headers = new Headers({
        Authorization: `Basic ${btoa(
          `${process.env.REACT_APP_SPOTIFY_ID}:${process.env.REACT_APP_SPOTIFY_SECRET}`
        )}`,
      });

      // Make the API request
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();
    };

    fetchData();
  }, []);
};

export default SpotifyApi;
