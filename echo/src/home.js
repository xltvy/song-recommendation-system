import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TrackCard from './TrackCard';
import HeaderSlider from './HeaderSlider';

function Home() {

    const [recommendations, setRecommendations] = useState([]);
    const [track, setTrack] = useState({});

    const song_rec_api = axios.create({
        headers: { 'Content-Type': 'application/json' },
        baseURL: 'https://4photnkwcb.execute-api.us-east-1.amazonaws.com/default/song_post_req',
    });


    useEffect(() => {
      const fetchData = async () => {
        // Set up authorization headers
        const trackId = '2Am26UXisQ91vBLYdqd7Pa';

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
        await console.log(response.json());
        // const data = await response.json();
      };
  
      fetchData();
    }, []);
    const handleClick = async () => {
        try {
          const response = await song_rec_api.get();
          setRecommendations(response.data.recommendations);
          setTrack(response.data.track);
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <div className="home-container">
            <HeaderSlider />
            <div className='echo-button-container'>
            <button className='echo-button' onClick={handleClick}>Echo</button>
            <ul className="recommendations-list">
                {recommendations.map(recommendation => (
                <a key={recommendation} href={`https://open.spotify.com/track/${recommendation}`}>https://open.spotify.com/track/{recommendation}</a>
                ))}
            </ul>
            <TrackCard name={"Runaway"} artist={"Kanye West, Pusha T"} cover={track.icon} />
            </div>
        </div>
  );
}

export default Home;