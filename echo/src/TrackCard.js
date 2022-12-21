import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackCard = (props) => {

  return (
    <div>
        <div className='track-card'>
            <div>
                <img src={props.icon} className="album-art" alt="album art" height={140} />
            </div>
            <label className='track-title'>
                {props.name}
            </label>
            <label className='track-artist'>
                {props.artist}
            </label>
        </div>
    </div>
  );
};

export default TrackCard;
