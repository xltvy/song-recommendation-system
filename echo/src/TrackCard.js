import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackCard = (props) => {

  return (
    <div>
        <div className='track-card'>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/tr/f/f0/My_Beautiful_Dark_Twisted_Fantasy.jpg" className="album-art" alt="album art" height={165} />
            </div>
            <div className='track-info'>
                <label className='track-title'>
                    {props.name}
                </label>
                <label className='track-artist'>
                    {props.artist}
                </label>
            </div>
        </div>
    </div>
  );
};

export default TrackCard;
