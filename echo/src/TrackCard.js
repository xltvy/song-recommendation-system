import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackCard = ({cover, title, artist}) => {

  return (
    <div>
        <div className='track-card'>
            <div>
                <img src={cover} className="album-art" alt="album art" height={165} />
            </div>
            <div className='track-info'>
                <label className='track-title'>
                    {title}
                </label>
                <label className='track-artist'>
                    {artist}
                </label>
            </div>
        </div>
    </div>
  );
};

export default TrackCard;
