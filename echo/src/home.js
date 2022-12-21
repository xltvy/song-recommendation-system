import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TrackCard from './TrackCard';
import HeaderSlider from './HeaderSlider';

function Home() {

    const [recommendations, setRecommendations] = useState([]);
    const [track, setTrack] = useState({});
    const [trackData, setTrackData] = useState([]);

    const song_rec_api = axios.create({
        headers: { 'Content-Type': 'application/json' },
        baseURL: 'https://4photnkwcb.execute-api.us-east-1.amazonaws.com/default/song_post_req',
    });


    useEffect(  () => {
      const tempTrackData = [];
      for(let i = 0; i < recommendations.length; i++) {
         axios
          .get(`https://api.spotify.com/v1/tracks/${recommendations[i]}`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
            },
          })
          .then((response) => {
            // If request is good...
            tempTrackData.push(response.data);
            if(i === recommendations.length - 1) {
              axios
              .get(`https://api.spotify.com/v1/tracks/${track}`, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
                },
              })
              .then((response) => {
                // If request is good...
                tempTrackData.push({track: response.data});
              })
              .catch((error) => {
                console.log('error ' + error);
              });
            }

          })
          .catch((error) => {
            console.log('error ' + error);
          });
      }

      setTrackData([...tempTrackData]);
      console.log(trackData[0]);
      console.log(tempTrackData);
    }, [track]);

    const handleClick = async () => {
        try {
          const response = await song_rec_api.get();
          setRecommendations(response.data.recommendations);
          setTrack(response.data.track);
        } catch (error) {
          console.error(error);
        }
    };  

    const recommendedTracks = trackData.map((recommendation) => (
        <TrackCard title={recommendation?.name} artist={recommendation?.artists} cover={recommendation?.album?.images[1]} />
    ));
    console.log(trackData[0]);


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
            {recommendedTracks}
            <TrackCard name={"Runaway"} artist={"Kanye West, Pusha T"} cover={track.icon} />
            </div>
        </div>
  );
}

export default Home;