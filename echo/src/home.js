import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Track from './Track.js';

function Home() {

    const [recommendations, setRecommendations] = useState([]);
    const [track, setTrack] = useState({});

    const song_rec_api = axios.create({
        headers: { 'Content-Type': 'application/json' },
        baseURL: 'https://4photnkwcb.execute-api.us-east-1.amazonaws.com/default/song_post_req',
    });

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
            <div className='echo-button-container'>
            <button className='echo-button' onClick={handleClick}>Echo</button>
            <ul className="recommendations-list">
                {recommendations.map(recommendation => (
                <a key={recommendation} href={`https://open.spotify.com/track/${recommendation}`}>https://open.spotify.com/track/{recommendation}</a>
                ))}
            </ul>
            </div>
        </div>
  );
}

export default Home;