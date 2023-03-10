import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TrackCard from './TrackCard.js';
import HeaderSlider from './HeaderSlider.js';
import ScaleLoader from 'react-spinners/ScaleLoader';

function Home() {
  const [recommendations, setRecommendations] = useState([]);
  const [track, setTrack] = useState({});
  const [trackData, setTrackData] = useState([]);
  const [loading, setLoading] = useState(false);

  const song_rec_api = axios.create({
    headers: { 'Content-Type': 'application/json' },
    baseURL:
      'https://4photnkwcb.execute-api.us-east-1.amazonaws.com/default/song_post_req',
  });
  let requests = [];
  useEffect(() => {
    recommendations.map((rec) => {
      requests.push(
        axios.get(`https://api.spotify.com/v1/tracks/${rec}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
          },
        })
      );
    });
    requests.push(
      axios.get(`https://api.spotify.com/v1/tracks/${track}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
        },
      })
    );
    let results = [];
    Promise.all(requests).then((responses) => {
      results = responses.map((response) => response.data);
      setTrackData(results);
      setLoading(false);
      console.log(trackData);
    });
  }, [track]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await song_rec_api.get();
      setRecommendations(response.data.recommendations);
      setTrack(response.data.track);
    } catch (error) {
      console.error(error);
    }
  };

  const recommendedTracks = trackData.map((data) => (
    <TrackCard
      title={data?.name}
      artist={data?.artists[0]?.name}
      cover={data?.album?.images[1]['url']}
      url={data?.external_urls?.spotify}
    />
  ));
  console.log(trackData[0]);

  return (
    <div className='home-container'>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Alexandria'
      ></link>
      <HeaderSlider />
      <div className='echo-button-container'>
        <button className='echo-button' onClick={handleClick}>
          ECHO SONGS
        </button>
        <div className='cards-container'>
          {loading ? (
            <div className='loading-spin'>
              <ScaleLoader
                color='#1bb954'
                height={140}
                width={16}
                radius={80}
              />{' '}
            </div>
          ) : (
            recommendedTracks
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
