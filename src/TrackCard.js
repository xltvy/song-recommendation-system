import React, { useState, useEffect } from 'react';

const TrackCard = ({cover, title, artist, url}) => {

  return (
    <div>
        <a className='track-card' href={url}>
            <div>
                <img src={cover} className="album-art" alt="album art" height={313} />
            </div>
            <div className='track-info'>
                <label className='track-title'>
                    {title}
                </label>
                <label className='track-artist'>
                    {artist}
                </label>
            </div>
        </a>
    </div>
  );
};

export default TrackCard;
