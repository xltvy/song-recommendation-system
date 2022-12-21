import logo from './logo.svg';
import './App.css';
import React from 'react';
import Home from './home';
import TrackCard from './TrackCard';
import SpotifyApi from './SpotifyApi';
function App() {
  return (
    <div className='App'>
      {/* <Home /> */}
      {/* <TrackCard /> */}
      <SpotifyApi />
    </div>
  );
}

export default App;
